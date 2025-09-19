import config from '../../config.json';
import { Box, Flex, HStack, Icon, Image, LinkBox, LinkOverlay, useColorModeValue, IconButton, Popover, PopoverTrigger, PopoverContent, PopoverBody, VStack, useDisclosure } from '@chakra-ui/react'
import { MdOpenInNew, MdMailOutline, MdMenu } from "react-icons/md";
import { Link as RouterLink, useLocation } from 'react-router-dom';

import type { LinkProps } from '../../api';

const NavLink = (props: LinkProps & { isActive?: boolean; onClose?: () => void }) => {
    const { children, href, target, isActive, onClose } = props;
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
        color: '#fff'
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
                onClick={onClose}
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
            onClick={onClose}
        >
            {children}
        </Box>
    );
}

export const NavigationBar = () => {
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Flex>
                <Box bg={useColorModeValue('gray.1', 'gray.900')} px={4} as="header" position="fixed" w="100%" zIndex="200" backgroundColor="white" borderBottom="2px solid #005587">
                    <Flex h={16} alignItems={'center'} justifyContent={'center'} position="relative">
                        <LinkBox position="absolute" left={0} top={0} bottom={0} display="flex" alignItems="center">
                            <Box>
                                <LinkOverlay as={RouterLink} to="/news">
                                    <Image src='../assets/Logo_con-terra_RGB_600px.png' w="100%" h={{ base: "10px", md: "32px" }} mt={{ base: "5px", md: "0" }}/>
                                </LinkOverlay>
                            </Box>
                        </LinkBox>
                        <p style={{ fontWeight: 500, fontSize: "x-large", textAlign: "center" }}>Community</p>
                        <Box position="absolute" right={0} top={0} bottom={0} display="flex" alignItems="center">                            
                            <Box display="block">
                                <Popover placement="bottom-end" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
                                    <PopoverTrigger>
                                        <IconButton
                                            aria-label="Open menu"
                                            icon={<MdMenu />}
                                            variant="solid"
                                            colorScheme='primary'
                                            size="md"
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent w="300px">
                                        <PopoverBody p={2}>
                                            <VStack spacing={4} align="stretch">
                                                {config.NavigationBar.links.map((link: any) => {
                                                    let isActive = false;
                                                    if (!link.isExternal && !link.isMailto && link.link) {
                                                        isActive = location.pathname === link.link;
                                                    }
                                                    return (
                                                        <Box key={link.text} borderBottom="1px" borderColor="gray.100" _last={{ borderBottom: 'none' }}>
                                                            {link.isExternal ? (
                                                                <NavLink href={link.link} target="_blank" isActive={isActive} onClose={onClose}>
                                                                    <Icon className="navigation-bar--external-link-icon"  mr={2} as={MdOpenInNew} />
                                                                    {link.text}
                                                                </NavLink>
                                                            ) :
                                                                link.isMailto ? (
                                                                    <NavLink href={link.link} isActive={isActive} onClose={onClose}>
                                                                        <Icon className="navigation-bar--external-link-icon" mr={2} as={MdMailOutline} />
                                                                        {link.text}
                                                                    </NavLink>
                                                                ) : (
                                                                    <NavLink href={link.link} isActive={isActive} onClose={onClose}>
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