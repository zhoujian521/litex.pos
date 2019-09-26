# LITEX Pos 接口文档

# 1：Api

## 001: config

* **method**：配置接口

* **request**：无

* **response**：

  | 参数      | 类型         | 说明       | 必填 |
  | -------- | -----------  | --------- | ---- |
  | baseUrl  | string       | BaseUrl   | Y    |
  | contacts | **contacts** | 联系人     | N    |
  | fiats | **fiats**       | 支持的法币  | Y   |

* **fiats**：

  | 参数       | 类型         | 说明          | 必填 |
  | --------  | -----------  | ---------    | ---- |
  | fiatType  |   number     |  法币类型  1   | Y    |
  | fiatSymbol   |   string     |  法币   USD | Y    |

## 002： 商户登录

* **method** login

* **request**：

  |    参数    |    类型      |   说明     | 必填 |
  | --------  | -----------  | --------- | ---- |
  | userName  |   string     |  用户名    | Y    |
  | password  |   string     |  密码      | Y    |

* **response**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | userId    |   string     |  用户Id    | Y    |
  | status    |   number     |  登录状态   | Y   |
  | fiatType  |   number     |  法币类型   | N    |

## 003： 获取商户相关信息

* **method**：userInfo

* **request**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | userId    |   string     |  用户Id    | Y    |

* **response**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | balance    |   number    |  账户余额   | Y    |
  | userId    |   string     |  用户Id    | N    |
  | fiatType  |   number     |  法币类型   | N    |

## 004:  商户登出

* **method** logout

* **request**：无

* **response**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | userId    |   string     |  用户Id    | N    |
  | status    |   number     |  登录状态   | Y    |

## 005：商户下单接口

* **method**：pleaseOrder

* **request**：根据 section 校验商户是否为登录状态

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | fiatType    |   number     |  法币类型   | Y    |
  | amount      |   number     |  法币金额 [默认2位小数]  | Y    |

* **response**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | orderId   |   string     |  订单号    | Y    |
  | token     |   **token**  |  token    | Y    |
  | fait      |   **fait**   |  法币      | Y   |

* **token**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | symbol    |   string     |  USDT     | Y    |
  | amount    |   number     |  token数量 [默认8位小数]   | Y    |

* **fait**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | fiatType    |   number     |  法币类型     | Y    |
  | amount    |   number     |  法币金额 [默认2位小数]   | Y    |

## 006：订单列表

* **method** orders

* **request**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | userId    |   string     |  用户Id    | Y   |
  | page    |   number     |  page       | N   |
  | limit    |   number     | size       | N   |
  | status    |   number     |  订单状态   | N    |
  | orderId    |   number     |  订单号    | N   |

* **response**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | orderId    |   string     |  用户Id    | Y   |
  | status    |   number     |  page       | Y  |
  | fait    |   **fait**     |  fait   | Y    |
  | stamp    |   string     |  时间戳    | Y   |
  | token    |   **token**     | token       | N   |

* **token**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | symbol    |   string     |  USDT     | Y    |
  | amount    |   number     |  token数量 [默认8位小数]   | Y    |

* **fait**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | fiatType    |   number     |  法币类型     | Y    |
  | amount    |   number     |  法币金额 [默认2位小数]   | Y    |

## 007：资金记录

* **method** assets

* **request**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | userId    |   string     |  用户Id    | Y   |
  | page    |   number     |  page       | N   |
  | limit    |   number     | size       | N   |

* **response**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | balance    |   number     |  账户余额    | Y   |
  | asset    |   **asset**       |  asset   | Y  |

* **asset**：
  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | token    |   **token**     | token       | N   |
  | fait    |   **fait**     |  fait   | Y    |

  * **token**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | symbol    |   string     |  USDT     | Y    |
  | amount    |   number     |  token数量 [默认8位小数]   | Y    |

* **fait**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | fiatType    |   number     |  法币类型     | Y    |
  | amount    |   number     |  法币金额 [默认2位小数]   | Y    |

## 008：切换默认币种=>默认币种是否需要上传=>待定

* **method** switchFiat

* **request**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | userId    |   string     |  商户Id   | Y    |
  | fiatType    |   number     |  法币类型     | Y    |

* **response**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | userId    |   string     |  商户Id   | Y    |
  | fiatType    |   number     |  法币类型     | Y    |

# 2：Socket

## 001:  userPayRes

* **response**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | userId    |   string     |  用户Id    | Y    |
  | status    |   number     |  订单状态   | Y   |
  | stamp    |   string     |  到账时间    | Y   |
  | token    |   **token**     | token       | N   |
  | fait    |   **fait**     |  fait   | Y    |

  * **token**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | symbol    |   string     |  USDT     | Y    |
  | amount    |   number     |  token数量 [默认8位小数]   | Y    |

* **fait**：

  |    参数    |    类型      |   说明     | 必填  |
  | --------  | -----------  | --------- | ---- |
  | fiatType    |   number     |  法币类型     | Y    |
  | amount    |   number     |  法币金额 [默认2位小数]   | Y    |

