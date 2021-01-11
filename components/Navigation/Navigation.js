import React, { Component } from "react";
import { Menu, Sidebar, Icon } from "semantic-ui-react";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation() {
  const colorsA = ["blue", "orange", "yellow", "olive"];
  const iconos = ["home", "dragon", "industry", "globe"];
  const links = ["Home", "Figuras", "Oficina", "Mundo"];
  const link = ["/", "/figuras", "/oficina", "/mundo"];

  const router = useRouter();

  return (
    <>
      {colorsA.map((c, index) => (
        <Link href={link[index]} key={link[index]}>
          <Menu.Item
            as="a"
            key={c}
            name={c}
            active={router.route === link[index]}
            color={c}
          >
            {index === 1 ? (
              <Icon>
                <FontAwesomeIcon icon={faDragon} />
              </Icon>
            ) : (
              <Icon name={iconos[index]} />
            )}

            <span>{links[index]}</span>
          </Menu.Item>
        </Link>
      ))}
    </>
  );
}
