type AsyncCall<
  T = { [k: string | number | symbol]: any },
  Success = any,
  Fail = any,
  Complete = any,
> = (
  params: T & {
    success: (params: Success) => void;
    fail: (params: Fail) => void;
    complete?: (params: Complete) => void;
  },
) => void;

/**
 * 地图组件上下文对象
 *
 * @see https://opendocs.alipay.com/mini/api/mapcontext
 */
export interface MapContext {
  /**
   * 设置地图底图类型
   *
   * @see https://opendocs.alipay.com/mini/api/setmaptype
   */
  setMapType: AsyncCall<{ mapType: 0 | 1 | 2 | 3 | 4 }>;
  /**
   * 平移缩放到指定区域
   *
   * @see https://opendocs.alipay.com/mini/api/includepoints
   */
  includePoints: AsyncCall<{
    points: Array<{ longitude: number; latitude: number }>;
    padding?: [number, number, number, number];
  }>;
}

export interface MapInstance {
  getContext: () => MapContext;
}

/**
 * 经纬度坐标点
 */
export interface LngLat {
  longitude: number;
  latitude: number;
}

/**
 * 标记点
 *
 * 更多属性信息查看 @see https://opendocs.alipay.com/mini/component/map#markers
 */
export interface Marker extends LngLat {
  id: string;
  iconPath?: string;
  width?: number;
  height?: number;
  alpha?: number;
  anchorX?: number;
  anchorY?: number;
  label?: {
    content?: string;
    color?: string;
    fontSize?: number;
    borderRadius?: number;
    bgColor?: string;
    padding?: number;
  };
}

/**
 * 折线
 *
 * 更多属性信息查看 @see https://opendocs.alipay.com/mini/component/map#polyline
 */
export interface Polyline {
  points: LngLat[];
  //
  width?: number;
  color?: string;
  dottedLine?: boolean;
  //
  iconPath?: string;
  iconWidth?: number;
  colorList?: string[];
}

/**
 * 面
 *
 * @see https://opendocs.alipay.com/mini/component/map?pathHash=c9886630#polygon
 */
export interface Polygon {
  points: LngLat[];
  color?: string;
  fillColor?: string;
  width?: number;
}

/**
 * @see https://opendocs.alipay.com/mini/component/map
 */
export interface Map {
  id?: string;
  /**
   * @title 地图类型
   * @description 底图的样式
   *
   * - 0 标准地图
   * - 1 卫星地图
   * - 2 夜视地图
   * - 3 导航地图
   * - 4 公交地图
   */
  mapType?: 0 | 1 | 2 | 3 | 4 | string;
  /**
   * @title 展示实时定位点
   * @description 展示用户当前带箭头的实时定位点
   */
  showLocation?: boolean;
  /**
   * @title 中心纬度
   * @description
   */
  latitude?: number;
  /**
   * @title 中心经度
   * @description
   */
  longitude?: number;
  /**
   * @title 缩放级别
   * @description 取值范围为 5-18
   * @default "16"
   */
  scale?: number;
  /**
   * @title 倾斜角度
   * @description 范围 0 ~ 40 , 关于 z 轴的倾
   * @default "0"
   */
  skew?: number;
  /**
   * @title 顺时针旋转的角度
   * @description 范围 0 ~ 360
   * @default "0"
   */
  rotate?: number;
  /**
   * @title 视野范围
   * @description 视野将进行小范围延伸包含传入的坐标
   */
  includePoints?: LngLat[];
  /**
   * @title 视野边界
   * @description 视野在地图 padding 范围内展示
   */
  includePadding?: { left: number; right: number; top: number; bottom: number };
  /**
   * @title 是否启用缩放
   * @description 缩放交互开关
   * @default true
   */
  enableZoom?: boolean;
  /**
   * @title 是否启用拖动
   * @description 拖动交互开关
   * @default true
   */
  enableScroll?: boolean;
  /**
   * @title 是否启用旋转
   * @description 旋转交互开关
   * @default true
   */
  enableRotate?: boolean;

  // * ------------------------------------------------------------ 数据

  /**
   * @title 标记点
   * @description 可在地图上展示多个标记点
   */
  markers?: Marker[];
  /**
   * @title 折线
   * @description 可在地图上展示多个折线
   */
  polyline?: Polyline[];
  /**
   * @title 面
   * @description 可在地图上展示多个面
   */
  polygon?: Polygon[];

  // * ------------------------------------------------------------ 事件

  /**
   * @title 地图视野变化事件
   * @description 拖动/旋转/缩放地图时触发
   */
  onRegionChange?: (event: {
    type: 'begin' | 'end';
    latitude: number;
    longitude: number;
    scale: number;
    skew: number;
    rotate: number;
    causedBy: 'update' | 'gesture';
  }) => void;
  /**
   * @title 地图点击事件
   * @description 点击地图时触发
   */
  onTap?: (event: { latitude: number; longitude: number }) => void;
  /**
   * @title 标记点击事件
   * @description 点击标记及其标签时触发
   */
  onMarkerTap?: (event: { markerId: string; latitude: number; longitude: number }) => void;
  /**
   * @title 地图初始化完成事件
   * @description 地图初始化完成即将开始渲染第一帧时触发
   */
  onInitComplete?: () => void;
}

export interface MarkerData extends Omit<Marker, 'id' | 'label'> {
  id?: string;
  label?: string | Marker['label'];
}

export interface PinMap extends Map {
  data?: MarkerData[];
  markerStyle?: Partial<Marker>;
}

export interface RouteData {
  markers?: MarkerData[];
  path?: Polyline;
}

export interface PathMap extends Map {
  data?: RouteData[];
  markerStyle?: Partial<Marker>;
  pathStyle?: Partial<Polyline>;
}
