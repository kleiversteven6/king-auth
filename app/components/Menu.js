import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
export default function MenuComponent() {
  const [activeItem, setActiveItem] = useState('inicio');
  const handleItemClick = (e, { name }) => {
    console.log(name);
    setActiveItem(name);
  };
  return (
    <>
      <Menu pointing secondary vertical fluid>
        <Menu.Item
          name="inicio"
          active={activeItem === 'inicio'}
          onClick={handleItemClick}
          as={NavLink}
          to="./"
        >
          Inicio
        </Menu.Item>

        <Menu.Item
          name="calculadora"
          active={activeItem === 'calculadora'}
          onClick={handleItemClick}
          as={NavLink}
          to="./calculadora"
        >
          Calculadora
        </Menu.Item>

        <Menu.Item
          name="generar"
          active={activeItem === 'generar'}
          onClick={handleItemClick}
          as={NavLink}
          to="./generar"
        >
          Generar Qr
        </Menu.Item>
        <Menu.Item
          name="validar"
          active={activeItem === 'validar'}
          onClick={handleItemClick}
          as={NavLink}
          to="./validar"
        >
          Validar Qr
        </Menu.Item>
      </Menu>
    </>
  );
}
