import { Box, Heading, Text, List, ListItem, ListIcon, Link, VStack, Divider } from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon } from "@chakra-ui/icons";

export const AboutPage = () => {
    return (
        <Box className="page-content__container" maxW="800px" mx="auto" py={10} px={6} bg="white" borderRadius="lg" >
            <VStack align="start" spacing={6}>
                <Heading size="md" color="#005587">Was sind die con terra Community map.apps Bundles?</Heading>
                <Text>
                    Die <b>con terra Community map.apps Bundles</b> sind eine Sammlung modularer Erweiterungen für die Plattform <b>map.apps</b>&nbsp;
                    der con terra, die Entwickler:innen und Anwender:innen helfen, GIS-Anwendungen effizienter zu gestalten und individuell anzupassen.<br />
                    Sie dienen dazu, den Funktionsumfang von Anwendungen zu erweitern oder bestimmte Aufgaben zu vereinfachen.
                    Die Bundles sind modular aufgebaut, was eine flexible Kombination und Wiederverwendung ermöglicht.<br />
                    Entwickelt werden die Bundles gemeinsam mit der Community. Eine Übersicht über die Bundles ist in der<Link href="https://conterra.github.io/#/overview" color="#005587" isExternal ml={1} textDecoration="underline">Bundle-Übersicht</Link> verfügbar. Die Dazugehörigen Entwicklungsprojekte finden Sie auf der <Link href="https://github.com/conterra" color="#005587" isExternal ml={1} textDecoration="underline">GitHub Seite der con terra</Link>.
                </Text>
                <Divider />
                <Heading size="md" color="#005587">Vorteile der Nutzung</Heading>
                <Box w="100%">
                    <List
                        spacing={2}
                        pl={2}
                        display="grid"
                        gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
                        gap={2}
                        sx={{
                            '& > li': { marginTop: '0 !important' },
                            '& > li:nth-of-type(2)': { marginTop: '0 !important' },
                            '& > li:nth-of-type(3)': { marginTop: '0 !important' },
                            '& > li:nth-of-type(4)': { marginTop: '0 !important' }
                        }}
                    >
                        <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> <b>Modularität:</b><br />Flexible Kombination und Wiederverwendung.</ListItem>
                        <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> <b>Einfache Integration:</b><br />Bereitstellung als ZIP-/JAR-Dateien.</ListItem>
                        <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> <b>Zentrale Verwaltung:</b><br />Einfaches Update und Wartung.</ListItem>
                        <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> <b>Open Source:</b><br />Anpassungen durch die Community möglich.</ListItem>
                    </List>
                </Box>
                <Divider />
                <Heading size="md" color="#005587">Einstieg und Beteiligung</Heading>
                <Text>
                    Für Entwickler:innen bietet das Projekt <Link href="https://github.com/conterra/mapapps-4-developers" color="#005587" isExternal ml={1} textDecoration="underline">mapapps-4-developers</Link> einen Einstiegspunkt zum Erstellen eigener Bundles und Themes.
                    Dort finden Sie einige Beispiele für gängige Aufgaben.<br />
                    Gerne können Sie sich auch über Issues und mit Ideen beteiligen. Nutzen Sie dazu das GitHub Issue Feature oder treten Sie per<Link href="mailto:s.holtkamp@conterra.de" color="#005587" isExternal ml={1} textDecoration="underline">Mail</Link> mit uns in Kontakt.
                </Text>
                <Box bg="gray.50" borderRadius="md" p={4} w="100%">
                    <InfoIcon color="#005587" mr={2} />
                    Da die con terra Community map.apps Bundles durch die Community entwickelt werden, besteht bei Fehlern kein Anspruch auf Standard-Support. Wir unterstützen Sie jedoch gerne bei der Nutzung und Integration der Bundles in Ihre Anwendungen. <br />
                </Box>
            </VStack>
        </Box>
    );
}