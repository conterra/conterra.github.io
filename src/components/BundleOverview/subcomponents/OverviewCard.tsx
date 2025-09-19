import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, ButtonGroup, Button, Box, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useTheme } from '@chakra-ui/react';
import { MdOpenInNew, MdOutlineExitToApp } from "react-icons/md";
import { useState } from 'react';

interface OverviewCardProps {
    repository: any;
    controller: any;
}


export const OverviewCard = ({ repository, controller }: OverviewCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const imageUrl = `https://raw.githubusercontent.com/conterra/${repository.name}/refs/heads/main/screenshot.png`;
    return (
        <Card
            direction={'column'}
            overflow='hidden'
            variant='elevated'
            display='flex'
            height='100%'
            border="2px solid rgba(0, 0, 0, 0.1)"
            boxShadow="5px 5px 5px rgba(0, 0, 0, 0.1)"
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '100%' }}
                src={imageUrl}
                alt='Bundle Screenshot'
                cursor='pointer'
                onClick={() => setIsOpen(true)}
                px={1.25}
                pt={1.25}
            />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size='full' isCentered closeOnOverlayClick={true}>
                <ModalOverlay onClick={() => setIsOpen(false)} />
                <ModalContent bg='transparent' boxShadow='none' onClick={(e) => e.stopPropagation()}>
                    <ModalCloseButton color='white' zIndex={2} />
                    <ModalBody p={0} display='flex' alignItems='center' justifyContent='center' onClick={() => setIsOpen(false)}>
                        <Image
                            src={imageUrl}
                            alt='Bundle Screenshot'
                            maxH='90vh'
                            maxW='90vw'
                            objectFit='contain'
                            boxShadow='xl'
                            borderRadius='md'
                            onClick={(e) => e.stopPropagation()}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Stack flex='1' justify='space-between'>
                <CardBody flex='1'>
                    <Heading textTransform='capitalize' size='sm'>
                        {controller.formatRepositoryName(repository.name)}
                    </Heading>
                    <Text noOfLines={5} pt='2' fontSize='sm'>
                        {repository.description}
                    </Text>
                </CardBody>
                <Box px={6} pb={0}>
                    <Text fontSize='sm'>
                        Letztes Update {controller.getTimeDifferenceFromPush(repository.updated_at) === 0 ? 'heute' : `vor ${controller.getTimeDifferenceFromPush(repository.updated_at)} ${controller.getTimeDifferenceFromPush(repository.updated_at) === 1 ? 'Tag' : 'Tagen'}`},
                        &nbsp;{repository.open_issues_count} {repository.open_issues_count === 1 ? 'offenes Issue' : 'offene Issues'}
                    </Text>
                </Box>
                <CardFooter mt='auto'>
                    <ButtonGroup width="100%" justifyContent={'space-around'}>
                        <Button leftIcon={<MdOpenInNew />} variant='solid' onClick={() => window.open(`${repository.svn_url}`, '_blank')}>
                            Zur Detailseite
                        </Button>
                        {repository.homepage && (
                            <Button leftIcon={<MdOutlineExitToApp />} variant='solid' colorScheme='primary' onClick={() => window.open(`${repository.homepage}`, '_blank')}>
                                Zur Demo
                            </Button>
                        )}
                    </ButtonGroup>
                </CardFooter>
            </Stack>
        </Card>
    );
};
