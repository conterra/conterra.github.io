import config from '../../config.json';
import { Box, Flex, HStack, Icon, Image, LinkBox, LinkOverlay, useColorModeValue, IconButton, Popover, PopoverTrigger, PopoverContent, PopoverBody, VStack } from '@chakra-ui/react'
import { MdOpenInNew, MdMailOutline, MdMenu } from "react-icons/md";
import { Link as RouterLink, useLocation } from 'react-router-dom';

import type { LinkProps } from '../../api';

const NavLink = (props: LinkProps & { isActive?: boolean }) => {
    const { children, href, target, isActive } = props;
    const hoverBg = useColorModeValue('gray.200', 'gray.700');
    const isExternal = href?.startsWith('http') || href?.startsWith('mailto:');
    
    // Active link styles
    const activeStyles = isActive ? {
        background: '#005587',
        color: '#e3f2fd',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px rgba(0, 85, 135, 0.08)'
    } : {};
    
    // Hover styles based on active state
    const hoverStyles = isActive ? {
        textDecoration: 'none',
        bg: '#005587',
        color: '#1A202C'
    } : {
        textDecoration: 'none',
        bg: hoverBg
    };
    
    // Use RouterLink for internal links, <a> for external
    if (isExternal) {
        return (
            <Box
                as="a"
                px={2}
                py={1}
                rounded={'md'}
                _hover={hoverStyles}
                href={href}
                target={target}
                className="navigation-bar--nav-link"
                sx={activeStyles}
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
            _hover={hoverStyles}
            className="navigation-bar--nav-link"
            sx={activeStyles}
        >
            {children}
        </Box>
    );
}

export const NavigationBar = () => {
    const location = useLocation();
    return (
        <>
            <Flex>
                <Box bg={useColorModeValue('gray.1', 'gray.900')} px={4} as="header" position="fixed" w="100%" zIndex="200" backgroundColor="white" borderBottom="2px solid #005587">
                    <Flex h={16} alignItems={'center'} justifyContent={'center'} position="relative">
                        <LinkBox position="absolute" left={0} top={0} bottom={0} display={{ base: 'none', md: 'flex' }} alignItems="center">
                            <Box>
                                <LinkOverlay as={RouterLink} to="/news">
                                    <Image src='../assets/Logo_con-terra_RGB_600px.png' w="100%" h="32px"/>
                                </LinkOverlay>
                            </Box>
                        </LinkBox>
                        <p style={{ fontWeight: 500, fontSize: "x-large", textAlign: "center" }}>con terra Community</p>
                        <Box position="absolute" right={0} top={0} bottom={0} display="flex" alignItems="center">

                            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                                {config.NavigationBar.links.map((link: any) => {
                                    let isActive = false;
                                    if (!link.isExternal && !link.isMailto && link.link) {
                                        isActive = location.pathname === link.link;
                                    }
                                    return (
                                        link.isExternal ? (
                                            <NavLink key={link.text} href={link.link} target="_blank" isActive={isActive}>
                                                <Icon mr="5px" as={MdOpenInNew} />
                                                {link.text}
                                            </NavLink>
                                        ) :
                                            link.isMailto ? (
                                                <NavLink key={link.text} href={link.link} isActive={isActive}>
                                                    <Icon mr="5px" as={MdMailOutline} />
                                                    {link.text}
                                                </NavLink>
                                            ) : (
                                                <NavLink key={link.text} href={link.link} isActive={isActive}>
                                                    {link.text}
                                                </NavLink>
                                            )
                                    );
                                })}
                            </HStack>
                            
                            <Box display={{ base: 'block', md: 'none' }}>
                                <Popover placement="bottom-end">
                                    <PopoverTrigger>
                                        <IconButton
                                            aria-label="Open menu"
                                            icon={<MdMenu />}
                                            variant="ghost"
                                            size="md"
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent w="200px">
                                        <PopoverBody p={0}>
                                            <VStack spacing={0} align="stretch">
                                                {config.NavigationBar.links.map((link: any) => {
                                                    let isActive = false;
                                                    if (!link.isExternal && !link.isMailto && link.link) {
                                                        isActive = location.pathname === link.link;
                                                    }
                                                    return (
                                                        <Box key={link.text} borderBottom="1px" borderColor="gray.100" _last={{ borderBottom: 'none' }}>
                                                            {link.isExternal ? (
                                                                <NavLink href={link.link} target="_blank" isActive={isActive}>
                                                                    <Icon className="navigation-bar--external-link-icon" as={MdOpenInNew} />
                                                                    {link.text}
                                                                </NavLink>
                                                            ) :
                                                                link.isMailto ? (
                                                                    <NavLink href={link.link} isActive={isActive}>
                                                                        <Icon className="navigation-bar--external-link-icon" as={MdMailOutline} />
                                                                        {link.text}
                                                                    </NavLink>
                                                                ) : (
                                                                    <NavLink href={link.link} isActive={isActive}>
                                                                        {link.text}
                                                                    </NavLink>
                                                                )
                                                            }
                                                        </Box>
                                                    );
                                                })}
                                            </VStack>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}