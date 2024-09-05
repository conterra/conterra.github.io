'use client'
import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'

interface Link {
  text: string;
  link: string;
}

interface Props {
  children: Link;
  href: string;
}

const Links = [{text: 'Über Uns', link: "#about"}, {text: 'Funktionen', link: "#features"}, {text: 'Kontakt', link: "#contact"}]

const NavLink = (props: Props) => {
  const { children } = props

  return (
    
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={children?.link}>
      {children.text}
    </Box>
  )
}

export default function Navbar() {
  return (
    <>
    <Flex>
      <Box bg={useColorModeValue('gray.1', 'gray.900')} px={4} as="header" position="fixed" w="100%" zIndex= "200" backgroundColor="white" borderBottom="2px solid #005587">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box>
              <Image src='../assets/Logo_con-terra_RGB_600px.png'w="100%" h="32px" >
              </Image>
            </Box>
            <p style={{fontWeight:500, fontSize: "x-large"}}>Developer Network</p>
            <Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.text} href={link.link}>{link}</NavLink>
              ))}
            </HStack>
            </Box>         
        </Flex>
      </Box>
      </Flex>
    </>
  )
}