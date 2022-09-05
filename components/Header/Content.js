import { Navbar, Text, Avatar, Dropdown, Grid } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { CgLogIn } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";
import { auth } from "../Firebase/clientApp";

const navigation = [
  {
    title: "Hjem",
    link: "/",
  },
  {
    title: "Turer",
    link: "/turer",
  },
  {
    title: "Dykkerspots",
    link: "/dykkerspots",
  },
  {
    title: "Om os",
    link: "/omos",
  },
  {
    title: "Kontakt",
    link: "/kontakt",
  },
];

const Content = ({ user }) => {
  const { asPath } = useRouter();

  console.log(user);

  const logout = async () => {
    await signOut(auth);
  };
  return (
    <div className="w-full">
      <Navbar isBordered variant="sticky" css={{ boxShadow: "none" }}>
        <Navbar.Toggle showIn="xs" color="primary" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
          <Link color="primary" href="/">
            <div className="logo w-10 h-auto"></div>
          </Link>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="primary"
          hideIn="xs"
          variant="highlight-rounded"
          css={{ color: "#0A2540", fontWeight: "bold" }}
        >
          {navigation.map((item, index) => {
            if (asPath === item.link)
              return (
                <Navbar.Link
                  css={{ fontWeight: "bold" }}
                  isActive
                  key={index}
                  href={item.link}
                >
                  {item.title}
                </Navbar.Link>
              );
            else
              return (
                <Navbar.Link key={index} href={item.link}>
                  {item.title}
                </Navbar.Link>
              );
          })}
        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          {user ? (
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <div className="flex gap-2 items-center cursor-pointer bg-[#CEE4FE] p-3 rounded-xl hover:opacity-80">
                    <Text color="secondary" b>
                      <FaUserAlt />
                    </Text>
                    <div className="pt-1">
                      <Text color="secondary" b>
                        Profil
                      </Text>
                    </div>
                  </div>
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="primary"
                onAction={(actionKey) => console.log({ actionKey })}
                disabledKeys={["🇬🇧eng"]}
              >
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Logget ind som
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {user.email}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="settings" withDivider>
                  Turer
                </Dropdown.Item>
                <Dropdown.Item key="team_settings">Indstillinger</Dropdown.Item>
                <Dropdown.Item key="hjaelp" withDivider>
                  Hjælp
                </Dropdown.Item>
                <Dropdown.Item key="logud" withDivider color="error">
                  <Text onClick={logout} color="error">
                    Log ud
                  </Text>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="hidden sm:inline">
              <div className="flex items-center cursor-pointer">
                <Link color="primary" href="/auth">
                  <CgLogIn className="h-10 w-8" />
                </Link>
              </div>
            </div>
          )}
        </Navbar.Content>
        <Navbar.Collapse css={{ width: "100%" }}>
          {navigation.map((item, index) => {
            if (asPath === item.link)
              return (
                <Navbar.CollapseItem key={item} activeColor="primary" isActive>
                  <Link
                    color="primary"
                    css={{
                      minWidth: "100%",
                    }}
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                </Navbar.CollapseItem>
              );
            else
              return (
                <Navbar.CollapseItem key={item} activeColor="primary">
                  <Link
                    color="primary"
                    css={{
                      minWidth: "100%",
                    }}
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                </Navbar.CollapseItem>
              );
          })}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Content;
