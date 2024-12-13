import type { Scene } from '@antv/l7';
import type { Map, Marker } from '../../types/map';
import { urlToMarkerId } from './util';

export function setMapContext(props: Map, scene: Scene) {
  //初始化Image
  if (props.markers) {
    const icons = new Set(
      props.markers
        .filter((item: Marker) => item.iconPath !== undefined)
        .map((item: Marker) => item.iconPath),
    ) as unknown as string[];

    return Promise.all(
      Array.from(icons.values()).map(async (url: string) => {
        const id = urlToMarkerId(url);
        if (scene.hasImage(id)) {
          return;
        }
        return await scene.addImage(id, url);
      }),
    );
  }
}
