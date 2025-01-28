import {
  Box, Button, Card, CardBody, CardFooter, CardHeader,
  Heading, Image, SimpleGrid, Stack, StackDivider, Text
} from '@chakra-ui/react'

export const Features = (props: any) => {
  return (
    <>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        {props.data ? props.data.map((d: any, i: any) => (
          <div key={`${d.name}-${i}`} className='col-md-4'>
            <Card >

              <CardHeader>
                <Heading size='md'>{d.name}</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Beschreibung
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {d.description}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Letztes Update
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {d.updated_at}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Zustand
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {d.open_issues_count} offene Issues
                      <Image src={`https://github.com/conterra/${d.name}/actions/workflows/devnet-bundle-snapshot.yml/badge.svg`} />
                    </Text>
                  </Box>
                </Stack>
              </CardBody>

              <CardFooter>
                <Button variant='solid' colorScheme='blue' onClick={() => window.open(`${d.svn_url}`, '_blank')}>
                  Detailseite öffnen
                </Button>
              </CardFooter>

            </Card>
          </div>
        ))
          : 'loading'}
      </SimpleGrid>
    </>
  );
}