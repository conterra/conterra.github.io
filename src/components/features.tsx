import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, CardFooter, Button } from '@chakra-ui/react'

export const Features = (props: any) => {
  return (
    <div id='features' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Our Services</h2>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
        </div>
        <div className='row'>
          {props.data
            ? props.data.map((d: any, i: any) => (
              <div key={`${d.name}-${i}`} className='col-md-4'>
                <Card>
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
                {/* {' '}
                <i className={d.icon}></i>
                <div className='service-desc'>
                  <h3>{d.name}</h3>
                  <p>{d.text}</p>
                </div> */}
              </div>
            ))
            : 'loading'}
        </div>
      </div>
    </div>
  );
}