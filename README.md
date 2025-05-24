# moeChat by Moeru AI

## About

You may have already seen [Project AIRI](https://github.com/moeru-ai/airi).

This project is similar to AIRI with the following key differences:

- Focus on VRM / WebXR Experience
- Not interested in VTuber
- No attempts to connect to other games or software

<!-- ### Naming

Ever heard of [Galatea](https://en.wikipedia.org/wiki/Galatea_(mythology))?

To avoid naming conflicts and make it unique,
we named it after the satellite of the same name, [Neptune VI](https://en.wikipedia.org/wiki/Galatea_(moon)) (NEP6, E => 3). -->

## Development

> View the defined routes at [app/src/router.ts](https://github.com/moeru-ai/chat/blob/main/app/src/router.ts).

```bash
git clone https://github.com/moeru-ai/chat.git
cd chat
pnpm i
pnpm dev # @moeru-ai/chat
```

## Supported Devices

### VR

VR mode should be available on any SteamVR supported device and Quest / PICO.

### MR

MR mode requires some advanced features, so we have made a list of support:

- **Quest 3/3S**: Developers own this device, therefore have access to top-tier support
- **Vision Pro**: Untested, theoretically supported
- **Pico 4 Ultra**: Untested, theoretically supported

If you'd like to help with testing, please give us feedback in the [discussions](https://github.com/moeru-ai/chat/discussions).

## License

[MIT](./LICENSE.md)

[app/src/assets](./app/src/assets) and [app/public](./app/public) are third-party resources: see the reference for licenses.
