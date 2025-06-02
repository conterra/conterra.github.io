import config from '../../config.json';
import { Box, Flex, HStack, Icon, Image, LinkBox, LinkOverlay, useColorModeValue } from '@chakra-ui/react'
import { MdOpenInNew, MdMailOutline } from "react-icons/md";
import { Link as RouterLink } from 'react-router-dom';

import type { LinkProps } from '../../api';

import "./NavigationBar.css";

const NavLink = (props: LinkProps) => {
    const { children, href, target } = props;
    const hoverBg = useColorModeValue('gray.200', 'gray.700');
    // Use RouterLink for internal links, <a> for external
    const isExternal = href?.startsWith('http') || href?.startsWith('mailto:');
    if (isExternal) {
        return (
            <Box
                as="a"
                px={2}
                py={1}
                rounded={'md'}
                _hover={{ textDecoration: 'none', bg: hoverBg }}
                href={href}
                target={target}
                className='navigation-bar--nav-link'
            >
                {children}
            </Box>
        );
    }
    return (
        <Box
            as={RouterLink}
            to={href || '/'}
            px={2}
            py={1}
            rounded={'md'}
            _hover={{ textDecoration: 'none', bg: hoverBg }}
            className='navigation-bar--nav-link'
        >
            {children}
        </Box>
    );
}

export const NavigationBar = () => {
    return (
        <>
            <Flex className="navigation-bar--container">
                <Box bg={useColorModeValue('gray.1', 'gray.900')} px={4} as="header" position="fixed" w="100%" zIndex="200" backgroundColor="white" borderBottom="2px solid #005587">
                    <Flex h={16} alignItems={'center'} justifyContent={'center'} position="relative">
                        <LinkBox position="absolute" left={0} top={0} bottom={0} display="flex" alignItems="center">
                            <Box>
                                <LinkOverlay as={RouterLink} to="/news">
                                    <Image src='../assets/Logo_con-terra_RGB_600px.png' w="100%" h="32px" />
                                </LinkOverlay>
                            </Box>
                        </LinkBox>
                        <p style={{ fontWeight: 500, fontSize: "x-large", textAlign: "center" }}>Developer Network Bundles</p>
                        <Box position="absolute" right={0} top={0} bottom={0} display="flex" alignItems="center">
                            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                                {config.NavigationBar.links.map((link: any) => (
                                    link.isExternal ? (
                                        <NavLink key={link.text} href={link.link} target="_blank">
                                            <Icon className="navigation-bar--external-link-icon" as={MdOpenInNew} />
                                            {link.text}
                                        </NavLink>
                                    ) :
                                        link.isMailto ? (
                                            <NavLink key={link.text} href={link.link}>
                                                <Icon className="navigation-bar--external-link-icon" as={MdMailOutline} />
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