import { Button, Checkbox, Dropdown, Input } from "@nextui-org/react";

import React, { useEffect, useMemo, useState } from "react";
import { firestore } from "../Firebase/clientApp";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const initialState = {
  navn: "",
  adresse: "",
  email: "",
  tel: 0,
  height: 0,
  weight: 0,
  sko: 0,
};

const Tilmelding = ({ tur, turId, turDato, closeHandler }) => {
  const [form, setForm] = useState(initialState);
  const [grill, setGrill] = useState(true);

  const [selectedPayment, setSelectedPayment] = useState(
    new Set(["Mobilepay"])
  );

  const selectedPaymentValue = useMemo(
    () => Array.from(selectedPayment).join(", ").replaceAll("_", " "),
    [selectedPayment]
  );

  const { navn, adresse, email, tel, height, weight, sko } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "Tilmelding"), {
        ...form,
        sendt: serverTimestamp(),
        betalingsmetode: selectedPaymentValue,
        turSted: tur,
        turId: turId,
        turDato: turDato,
        grill: grill,
        godkendt: false,
      });
      closeHandler()
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 bg-[#CFF0F8] p-4 md:p-8 w-full">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-col gap-3 w-full">
              <Input
                flat
                label="Navn"
                placeholder="Fulde navn"
                color="default"
                width="100%"
                aria-label="Title"
                size="lg"
                name="navn"
                value={navn}
                onChange={handleChange}
              />
              <Input
                flat
                label="Adresse"
                placeholder="Vej, Nr, Postnr, By"
                color="default"
                width="100%"
                aria-label="Adresse"
                size="lg"
                name="adresse"
                value={adresse}
                onChange={handleChange}
              />
              <Input
                flat
                label="Email"
                placeholder="E-mailadresse"
                color="default"
                width="100%"
                aria-label="Email"
                size="lg"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <Input
                flat
                label="Telefon"
                placeholder="Telefon nummer"
                color="default"
                width="100%"
                aria-label="Telefon"
                size="lg"
                name="tel"
                value={tel}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Input
                flat
                label="Højde"
                placeholder="Højde i cm"
                color="default"
                width="100%"
                aria-label="Højde"
                size="lg"
                name="height"
                value={height}
                onChange={handleChange}
              />
              <Input
                flat
                label="Vægt"
                placeholder="Vægt i kg"
                color="default"
                width="100%"
                aria-label="Vægt"
                size="lg"
                name="weight"
                value={weight}
                onChange={handleChange}
              />
              <Input
                flat
                label="Skostørrelse"
                placeholder="Skostørrelse i EU standard"
                color="default"
                width="100%"
                aria-label="Email"
                size="lg"
                name="sko"
                value={sko}
                onChange={handleChange}
              />
              <Checkbox
                color="primary"
                defaultSelected={true}
                value={grill}
                isSelected={grill}
                onChange={setGrill}
                size="sm"
              >
                Skal du være med til at grille?
              </Checkbox>
              <div className="w-full">
                <Dropdown>
                  <Dropdown.Button
                    color="white"
                    css={{ tt: "capitalize", width: "100%" }}
                  >
                    {selectedPaymentValue}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="primary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedPayment}
                    onSelectionChange={setSelectedPayment}
                  >
                    <Dropdown.Item key="mobilePay">MobilePay</Dropdown.Item>
                    <Dropdown.Item key="kontant">Kontant</Dropdown.Item>
                    <Dropdown.Item key="scuba_shoppen">
                      Scuba Shoppen
                    </Dropdown.Item>
                    <Dropdown.Item key="bankoverførsel">
                      Bankoverførsel
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full flex md:justify-end gap-6">
              <Button auto color="error" onClick={closeHandler}>
                ANNULLERE
              </Button>
              <Button type="submit">TILMELD</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Tilmelding;
