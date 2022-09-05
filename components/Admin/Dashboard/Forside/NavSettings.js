import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Grid, Input, Row, Text } from "@nextui-org/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../../Firebase/clientApp";
import { EditDocumentIcon } from "../../../../assets/EditDocumentIcon";
import { DeleteDocumentIcon } from "../../../../assets/DeleteDocumentIcon";
import { IoMdCloudUpload } from "react-icons/io";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const NavSettings = ({ user }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [sort, setSort] = useState(0);
  const [menuID, setMenuID] = useState("");

  const [opdater, setOpdater] = useState(false);

  const [menuList, setMenuList] = useState([]);

  const [update, setUpdate] = useState(false);

  const selectedFileRef = useRef(null);

  //State for icon URL som kommer fra addSlideToMenu
  const [selectedFile, setSelectedFile] = useState();

  const createMenu = async () => {
    //Sti til SLides collection
    //Opretter en collection med title & link fra useState via onChange
    try {
      const menuDocRef = await addDoc(collection(firestore, "Menu"), {
        adminID: user[0].email,
        title: title,
        link: link,
        sort: sort,
        timestamp: serverTimestamp(),
      });

      //Sti til hvor billede skal gemmes i Firestore storage
      const imageRef = ref(storage, `Menu/${menuDocRef.id}/icon`);

      //Opdater Slides doucment i db collection med url til billedet - efter document er oprettet
      await uploadString(imageRef, selectedFile, "data_url").then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(firestore, "Menu", menuDocRef.id), {
            icon: downloadURL,
          });
        }
      );

      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i opretning!", error.message);
    }
  };

  const menuCollectionRef = collection(firestore, "Menu");

  //Henter nav links i admin dashboard
  useEffect(() => {
    const getMenu = async () => {
      const menuData = await getDocs(menuCollectionRef);
      setMenuList(menuData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMenu();
  }, [update]);

  const handleChange = (title, link, sort, menuID) => {
    setTitle(title);
    setLink(link);
    setSort(sort);
    setMenuID(menuID);
    setOpdater(true);
  };

  //console.log("edit", title, link, sort, menuID);

  const addIconToMenu = (e) => {
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
      await deleteDoc(doc(firestore, "Menu", id));
    } catch (error) {
      confirm.log("Fejl i sletning!", error.message);
    }
  };

  const updateMenu = async () => {
    try {
      await updateDoc(doc(firestore, "Menu", menuID), {
        title: title,
        link: link,
        sort: sort,
      });
      setOpdater(false);
      setUpdate(!update);
      setTitle("");
      setLink("");
      setSort("");
    } catch (error) {
      confirm.log("Fejl i opdatering!", error.message);
    }
  };

  return (
    <div>
      <Text className="mb-3 font-bold">Navigation indstillinger</Text>
      <Grid>
        <Card variant="bordered">
          <Card.Body>
            <Grid className="flex flex-col gap-3">
              {menuList
                .sort((a, b) => a.sort - b.sort)
                .map((menu, index) => (
                  <Card isHoverable variant="bordered" key={index}>
                    <div className="flex justify-between items-center px-3">
                      <div className="p-2">
                        <Text>{menu.title}</Text>
                      </div>
                      <div className="w-14 flex justify-between">
                        <EditDocumentIcon
                          size={22}
                          fill="#083C50"
                          className="cursor-pointer"
                          onClick={() =>
                            handleChange(
                              menu.title,
                              menu.link,
                              menu.sort,
                              menu.id
                            )
                          }
                        />
                        <DeleteDocumentIcon
                          size={22}
                          fill="#F31260"
                          className="cursor-pointer"
                          onClick={() => {
                            handleDelete(menu.id), setUpdate(!update);
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
            </Grid>
            <Card.Divider className="mt-5" />
            <Text className="my-3 font-semibold">Ny menu</Text>

            <Grid className="flex flex-col gap-4">
              <Input
                bordered
                placeholder="Navn"
                color="default"
                width="100%"
                aria-label="Navn"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
              <Input
                bordered
                labelLeft="https://divingdjursland.dk/"
                placeholder="Link"
                aria-label="Link"
                width="100%"
                onChange={(event) => setLink(event.target.value)}
                value={link}
              />
            </Grid>
            <br />
            <div className="flex justify-between gap-3 flex-col md:flex-row sm:flex-row md:gap-[20%] items-end">
              <div className="flex flex-col gap-2 w-full ">
                <Input
                  label="Sorter efter"
                  type="number"
                  placeholder="0"
                  width="100%"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                />
                <Button
                  flat
                  className="text-black w-full"
                  css={{ background: "#F1F3F5" }}
                  auto
                  onClick={() => selectedFileRef.current?.click()}
                  width=""
                >
                  <Text>Upload icon</Text>
                  <IoMdCloudUpload className="text-xl ml-3" />
                </Button>
                <input
                  type="file"
                  hidden
                  ref={selectedFileRef}
                  onChange={addIconToMenu}
                />
              </div>

              {opdater ? (
                <Button color="primary" onClick={updateMenu} className="w-full">
                  Opdater
                </Button>
              ) : (
                <Button color="primary" onClick={createMenu} className="w-full">
                  Tilføj ny menu
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </Grid>
    </div>
  );
};

export default NavSettings;
