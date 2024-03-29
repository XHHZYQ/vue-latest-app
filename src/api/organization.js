
import { $post } from '../utils/request.js';

/**-----------------------------通用接口------------------------------------------ */
/** 省市区三级联动*/
export const apiAreaOptions = (params) => $post({
  url: '/public/area-tree',
  params
});

/** 获取数据字典*/
export const apiDataMap = (params) => $post({
  url: '/datamap/get-leaf',
  params
});
/**-----------------------------通用接口------------------------------------------ */

/**----------------------------------------------------------------------- */
// 学校列表
export const schoolList = (params) => $post({
  url: '/school/list',
  params
});

// 学校新增
export const schoolCreate = (params) => $post({
  url: '/school/create',
  params
});

// 学校详情
export const schoolDetail = (params) => $post({
  url: '/school/detail',
  params
});

// 学校编辑
export const schoolEdit = (params) => $post({
  url: '/school/edit',
  params
});

// 学校删除
export const schoolDelete = (params) => $post({
  url: '/school/delete',
  params
});

// 学校状态
export const schoolStatus = (params) => $post({
  url: '/school/enable-disable',
  params
});

export const organizeOrganizeList = params => $post({
  url: '/organize/organize-list',
  params
});
/**----------------------------------------------------------------------- */
