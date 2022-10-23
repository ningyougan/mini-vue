export const enum ShapeFlags {
  ELEMENT = 1,
  STATEFUL_COMPONENT = 1 << 1,
  TEXT_CHILDREN = 1 << 2,
  ARRAY_CHILDREN = 1 << 3,
  SLOT_CHILDREN = 1 << 4,
}

// 添加 |
// 0001  // element类型
// 0010  // stateful
// ----
// 0011

// 查找 &
// 0010;
// 0001
// &
// 0000;
