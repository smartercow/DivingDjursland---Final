import React, { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore, storage } from "../../../Firebase/clientApp";
import { getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { Button, Card, Grid, Input, Row, Text, Textarea } from "@nextui-org/react";
import { IoMdCloudUpload } from "react-icons/io";
import NavSettings from "./NavSettings";
import { DeleteDocumentIcon } from "../../../../assets/DeleteDocumentIcon";
import Video from "./Video";

const Forsiden = () => {
  //State for title & link fra inputs
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")

  const selectedFileRef = useRef(null);

  //Auth state for hvilken bruger der logget ind
  const user = useAuthState(auth);

  console.log(user);

  //console.log('user', user[0].email)

  //True/False for useEffect opdatering
  const [update, setUpdate] = useState(false);

  //State for alle documents i Slides collection der mappes ud i return
  const [slideList, setSlideList] = useState([]);

  //Sti til Slides collection Firestore database som bruges af flere functions
  const slideCollectionRef = collection(firestore, "Slides");

  //State for billede URL som kommer fra addImageToPost
  const [selectedFile, setSelectedFile] = useState(null);

  //Funktion til at oprette slides
  const createSlide = async () => {
    //Sti til SLides collection
    //Opretter en collection med title & link fra useState via onChange
    const slideDocRef = await addDoc(collection(firestore, "Slides"), {
      adminID: user[0].email,
      title: title,
      link: link,
      beskrivelse: description,
      content: content,
      timestamp: serverTimestamp(),
    });

    //console.log("New doc added with ID", slideDocRef.id)

    //Sti til hvor billede skal gemmes i Firestore storage
    const imageRef = ref(storage, `Slides/${slideDocRef.id}/image`);

    //Opdater Slides doucment i db collection med url til billedet - efter document er oprettet
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(firestore, "Slides", slideDocRef.id), {
          image: downloadURL,
        });
      }
    );
    //Nulstiller file input value
    setSelectedFile(null);
    setUpdate(!update);
  };

  //Ligger billede URL i selectedFile state via onChange på file input
  const addImageToSlide = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "Slides", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  //Henter alle documents i Slides collection og sætter dem i en state der mapper dem under i return
  useEffect(() => {
    const getSlides = async () => {
      const slidesData = await getDocs(slideCollectionRef);
      setSlideList(
        slidesData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getSlides();
  }, [update]);

  return (
    <div>
      <Card variant="bordered">
        <Card.Header>
          <Text h4>Forside</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <div className="flex mb-4">
            <Grid.Container gap={2} justify="flex-start">
              {slideList.map((slide, index) => (
                <Grid xs={6} sm={3} key={index}>
                  <Card variant="bordered">
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        src={slide.image}
                        objectFit="cover"
                        width="100%"
                        height={140}
                        alt={slide.title}
                      />
                    </Card.Body>
                    <Card.Footer>
                      <Row
                        wrap="nowrap"
                        justify="space-between"
                        gap={0.2}
                        align="center"
                      >
                        <Text className="truncate">{slide.title}</Text>
                        <Text>
                          <DeleteDocumentIcon
                            fill="#F31260"
                            className="cursor-pointer"
                            onClick={() => {
                              handleDelete(slide.id);
                            }}
                          />
                        </Text>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Grid>
              ))}
            </Grid.Container>
          </div>
          <Card.Divider />

          <div className="">
            {/* flex flex-col md:flex-row gap-4 mt-5 */}
            {/* Inputs */}
            <div>
              <Text className="my-3 font-bold">Opret en ny slide</Text>
              <Grid>
                <Card variant="bordered">
                  <Card.Body>
                    <div className="flex flex-col gap-4">
                      <Grid>
                        <Input
                          bordered
                          placeholder="Titel"
                          color="default"
                          width="100%"
                          aria-label="Titel"
                          onChange={(event) => setTitle(event.target.value)}
                        />
                      </Grid>
                      <Grid>
                        <Input
                          bordered
                          placeholder="Beskrivelse"
                          width="100%"
                          aria-label="beskrivelse"
                          onChange={(event) => setDescription(event.target.value)}
                        />
                      </Grid>
                      <Grid>
                        <Textarea
                          bordered
                          placeholder="Indhold"
                          width="100%"
                          aria-label="content"
                          onChange={(event) => setContent(event.target.value)}
                        />
                      </Grid>
                      <Grid>
                        <Input
                          bordered
                          labelLeft="https://"
                          placeholder="scubafun.dk/"
                          width="100%"
                          aria-label="Link"
                          onChange={(event) => setLink(event.target.value)}
                        />
                      </Grid>
                      <div>
                        <input
                          type="file"
                          placeholder="Upload billede..."
                          className="w-full"
                          hidden
                          onChange={addImageToSlide}
                          ref={selectedFileRef}
                        />
                      </div>
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:gap-[20%]">
                        <Button
                          flat
                          css={{ background: "#F1F3F5" }}
                          className="text-black w-full"
                          auto
                          onClick={() => selectedFileRef.current?.click()}
                        >
                          <Text>Upload billede</Text>
                          <IoMdCloudUpload className="text-xl ml-3" />
                        </Button>
                        <Button
                          color="primary"
                          onClick={createSlide}
                          className="w-full"
                        >
                          Tilføj ny slide
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Grid>
            </div>

            {/* Navigation indstillinger */}
            <Card.Divider className="mt-5 mb-3" />
            <div>
              <NavSettings user={user} />
            </div>
            <div>
              <Video />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Forsiden;
