// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/debug/animations`
  | `/debug/illuminance`
  | `/debug/input`
  | `/debug/menu`
  | `/debug/planes`
  | `/debug/positional-audio`
  | `/debug/settings`
  | `/debug/speech-recognition`
  | `/debug/tablet`
  | `/debug/text`

export type Params = {
  
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
