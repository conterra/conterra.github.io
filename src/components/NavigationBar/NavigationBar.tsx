import config from '../../config.json';
import { Box, Flex, HStack, Icon, Image, useColorModeValue } from '@chakra-ui/react'
import { MdOpenInNew } from "react-icons/md";

import type { LinkProps } from '../../api';

import "./NavigationBar.css";

const NavLink = (props: LinkProps) => {
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
            href={props.href}
            className='navigation-bar--nav-link'
        >
            {children}
        </Box>
    )
}

export const NavigationBar = () => {
    return (
        <>
            <Flex className="navigation-bar--container">
                <Box bg={useColorModeValue('gray.1', 'gray.900')} px={4} as="header" position="fixed" w="100%" zIndex="200" backgroundColor="white" borderBottom="2px solid #005587">
                    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                        <Box>
                            <Image src='../assets/Logo_con-terra_RGB_600px.png' w="100%" h="32px" >
                            </Image>
                        </Box>
                        <p style={{ fontWeight: 500, fontSize: "x-large" }}>Developer Network</p>
                        <Box>
                            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                                {config.NavigationBar.links.map((link: any) => (
                                    link.isExternal ? (
                                        <NavLink key={link.text} href={link.link}>
                                            <Icon className="navigation-bar--external-link-icon" as={MdOpenInNew} />
                                            {link.text}
                                        </NavLink>
                                    ) : (
                                        <NavLink key={link.text} href={link.link}>
                                            {link.text}
                                        </NavLink>
                                    )
                                ))}
                            </HStack>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}