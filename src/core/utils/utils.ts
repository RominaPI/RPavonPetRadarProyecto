import { envs } from "src/config/envs"

export const generateMapBoxImageTwoPoints = (
    lngLost: number, latLost: number,
    lngFound: number, latFound: number
): string => {
    const width = 800;
    const height = 400
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s-l+E6605C(${lngLost},${latLost}),pin-s-l+82E65B(${lngFound},${latFound})/auto/${width}x${height}?access_token=${envs.MAPBOX_TOKEN}`
}