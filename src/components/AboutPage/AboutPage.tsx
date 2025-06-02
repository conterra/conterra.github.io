import { Box, Heading, Text, List, ListItem, ListIcon, Link, VStack, Divider } from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon } from "@chakra-ui/icons";

export const AboutPage = () => {
    return (
        <Box className="page-content__container" maxW="800px" mx="auto" py={10} px={6} bg="white" borderRadius="lg" >
            <VStack align="start" spacing={6}>
                <Text fontSize="lg">
                    Die <b>Developer Network Bundles</b> von con terra sind eine Sammlung modularer Erweiterungen für die Plattform <b><i>map.apps</i></b>,
                    die Entwickler:innen und Anwender:innen helfen, GIS-Anwendungen effizienter zu gestalten und individuell anzupassen.
                    Diese Bundles sind über das GitHub-Profil von con terra verfügbar:
                    <Link href="https://github.com/conterra" color="#005587" isExternal ml={1}>https://github.com/conterra</Link>.
                </Text>
                <Divider />
                <Heading size="md" color="#005587">Was sind Developer Network Bundles?</Heading>
                <Text>
                    Developer Network Bundles sind vorgefertigte Funktionsbausteine, die in <b><i>map.apps</i></b> integriert werden können.
                    Sie dienen dazu, den Funktionsumfang von Anwendungen zu erweitern oder bestimmte Aufgaben zu vereinfachen.
                    Die Bundles sind modular aufgebaut, was eine flexible Kombination und Wiederverwendung ermöglicht.
                </Text>
                <Divider />
                <Heading size="md" color="#005587">Vorteile der Nutzung</Heading>
                <List spacing={2} pl={2}>
                    <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> <b>Modularität:</b> Flexible Kombination und Wiederverwendung.</ListItem>
                    <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> <b>Einfache Integration:</b> Bereitstellung als ZIP-/JAR-Dateien.</ListItem>
                    <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> <b>Zentrale Verwaltung:</b> Einfaches Update und Wartung.</ListItem>
                    <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> <b>Open Source:</b> Anpassungen durch die Community möglich.</ListItem>
                </List>
                <Divider />
                <Heading size="md" color="#005587">Einstieg und weitere Informationen</Heading>
                <Text>
                    Für Entwickler:innen bietet das Projekt <b><i>mapapps-4-developers</i></b> einen Einstiegspunkt zum Erstellen eigener Bundles und Themes.
                    Es enthält Beispiele für gängige Aufgaben wie das Erstellen von Widgets mit Vue.js oder das Anpassen eigener Themes.
                </Text>
                <Text>
                    Weitere Informationen und eine Übersicht der verfügbaren Bundles finden sich auf dem GitHub-Profil von con terra:
                    <Link href="https://github.com/conterra" color="#005587" isExternal ml={1}>https://github.com/conterra</Link>.
                </Text>
                <Box bg="gray.50" borderRadius="md" p={4} w="100%">
                    <InfoIcon color="#005587" mr={2} />
                    Die Developer Network Bundles bieten eine effektive Möglichkeit, <b><i>map.apps</i></b>-Anwendungen individuell zu gestalten
                    und den Funktionsumfang gezielt zu erweitern. Durch die modulare Struktur und die offene Bereitstellung fördern sie
                    eine flexible und nachhaltige Entwicklung von GIS-Anwendungen für Entwickler:innen und Anwender:innen gleichermaßen.
                </Box>
            </VStack>
        </Box>
    );
}