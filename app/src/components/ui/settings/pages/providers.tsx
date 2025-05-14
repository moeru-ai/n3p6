import type { ContainerProperties } from '@react-three/uikit'

import { Container, Text } from '@react-three/uikit'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@react-three/uikit-default'

export const SettingsProviders = (props: ContainerProperties) => (
  <Container flexDirection="column" {...props}>
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text>Is it accessible?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <Text>Is it styled?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Yes. It comes with default styles that matches the other components&apos; aesthetic.</Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <Text>Is it animated?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Yes. It&apos;s animated by default, but you can disable it if you prefer.</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </Container>
)
