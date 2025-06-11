#!/usr/bin/env node
/* eslint-disable @masknet/no-default-error */
/* eslint-disable @masknet/no-top-level */

import { exec } from 'node:child_process'
import { readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { argv } from 'node:process'
import { promisify } from 'node:util'

import type { GLTF, GLTFExtensions } from './_mixamo2vrma/types'

import { humanBones } from './_mixamo2vrma/bones'

const promisifyExec = promisify(exec)

const fbxPath = argv.at(2)

if (fbxPath == null)
  throw new Error('Usage: pnpm mixamo2vrma <path>')

if (!fbxPath.endsWith('.fbx'))
  throw new Error(`Error: ${fbxPath} does not have a .fbx extension.`)

const stats = await stat(fbxPath)
if (!stats.isFile())
  throw new Error(`Error: ${fbxPath} is not a file.`)

const gltfPath = `${fbxPath.slice(0, -'.fbx'.length)}.gltf`
const glbPath = `${fbxPath.slice(0, -'.fbx'.length)}.glb`
const vrmaPath = `${fbxPath.slice(0, -'.fbx'.length)}.vrma`

await promisifyExec(`fbx2gltf --input "${fbxPath}" --output "${gltfPath}"`)

const gltf = JSON.parse(await readFile(gltfPath, 'utf8')) as GLTF

const vrmc = {
  extensions: {
    VRMC_vrm_animation: {
      humanoid: {
        humanBones: Object.fromEntries(
          Object.entries(humanBones)
            .map(([key, name]) => {
              const node = gltf.nodes.findIndex(node => node.name === `mixamorig:${name}`)

              if (!node)
                throw new Error(`Error: ${name} not found in gltf nodes.`)

              return [key, { node }]
            }),
        ),
      },
      specVersion: '1.0',
    },
  },
  extensionsUsed: ['VRMC_vrm_animation'],
} satisfies GLTFExtensions

await writeFile(gltfPath, `${JSON.stringify({ ...gltf, ...vrmc }, null, 2)}\n`)

await promisifyExec(`pnpm exec gltf-pipeline -i "${gltfPath}" -o "${glbPath}"`)

await rename(glbPath, vrmaPath)
await rm(gltfPath)
await rm(join(dirname(fbxPath), 'buffer.bin'))

console.log('Convert succeeded.')
