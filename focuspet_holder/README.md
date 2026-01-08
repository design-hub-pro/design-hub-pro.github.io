# FocusPet: A Gamified Smart Phone Holder for Digital Distraction Management

# FocusPet：游戏化智能手机支架数字专注管理系统

---

## Project Overview | 项目概述

**FocusPet** is an innovative digital wellness system that combines a smart phone holder with a gamified mobile application. The system detects when a phone is placed on the holder, triggering a virtual pet experience that grows and evolves the longer the user stays focused. Users earn points that can be redeemed for new pets, skins, and customizations.

**FocusPet** 是一款创新的数字健康系统，将智能手机支架与游戏化移动应用相结合。系统检测手机放置在支架上的动作，触发虚拟宠物体验——用户专注时间越长，宠物成长越快。用户可获得积分，用于兑换新宠物、皮肤和个性化定制。

---

## Abstract | 摘要

### English

This paper presents **FocusPet**, an innovative digital wellness system that combines a smart phone holder with a gamified mobile application to combat smartphone addiction and promote focused work habits. The system employs a multi-sensor detection array (pressure, proximity, and capacitive sensors) to accurately identify phone placement events, triggering an engaging virtual pet experience that rewards users for distraction-free time.

The core innovation lies in the integration of **hardware-triggered focus sessions** with a **progressive reward mechanism**, where accumulated focus time translates to points redeemable for virtual pet customizations and new characters. Our behavioral design approach leverages intrinsic motivation through nurturing mechanics, creating a positive feedback loop that encourages sustained phone-free periods.

### 中文

本文介绍了**FocusPet**——一款创新的数字健康系统，通过智能手机支架与游戏化移动应用的结合，有效对抗智能手机成瘾并培养专注工作习惯。该系统采用多传感器检测阵列（压力、接近和电容传感器）精确识别手机放置事件，触发引人入胜的虚拟宠物体验，奖励用户的无干扰专注时间。

核心创新在于将**硬件触发的专注会话**与**渐进式奖励机制**相结合——累积的专注时间可转化为积分，用于兑换虚拟宠物皮肤和新角色。我们的行为设计方法通过养成机制激发内在动机，创造正向反馈循环，鼓励持续的无手机专注时段。

---

## Keywords | 关键词

**English:** Digital Wellness, Smart IoT Device, Gamification, Virtual Pet, Behavioral Design, Focus Management, BLE Communication

**中文:** 数字健康、智能物联网设备、游戏化设计、虚拟宠物、行为设计、专注管理、蓝牙低功耗通信

---

## File Structure | 文件结构

```
focuspet_holder/
├── index.html              # Main entry point with research paper layout
│                           # 主入口文件，研究论文风格布局
├── diagram_usecase.html    # Use Case Diagram (UML 2.0)
│                           # 用例图
├── diagram_technical.html  # Technical System Architecture (Patent Style)
│                           # 技术系统架构图（专利风格）
├── home.html              # Home Dashboard Screen
│                           # 首页仪表盘界面
├── focus_session.html     # Active Focus Session Screen
│                           # 专注会话界面
├── pet_shop.html          # Pet Shop & Customization Screen
│                           # 宠物商店界面
├── statistics.html        # Usage Statistics Screen
│                           # 使用统计界面
├── settings.html          # App Settings Screen
│                           # 设置界面
├── styles.css             # Global Styles
│                           # 全局样式
└── README.md              # Project Documentation (This file)
                           # 项目文档（本文件）
```

---

## System Components | 系统组件

### Hardware Components (100) | 硬件组件

| Component | Code | Description |
|-----------|------|-------------|
| Smart Phone Holder | 100 | Main hardware unit / 主硬件单元 |
| Processor Unit | 110 | MCU Controller / 微控制器 |
| Sensor Module | 120 | Detection Array / 检测阵列 |
| - Pressure Sensor | 121 | Weight detection / 压力检测 |
| - Proximity Sensor | 122 | Distance detection / 距离检测 |
| - Capacitive Sensor | 123 | Touch detection / 触摸检测 |
| Communication Module | 130 | BLE 5.0 / WiFi / 通信模块 |
| Power Management | 140 | Li-Po Battery / 锂电池管理 |
| LED Indicator | 150 | Status display / 状态指示 |
| USB-C Port | 160 | Charging interface / 充电接口 |
| Flash Memory | 170 | Local storage / 本地存储 |

### Software Components (200-300) | 软件组件

| Component | Code | Description |
|-----------|------|-------------|
| Mobile Application | 200 | iOS/Android app / 移动应用 |
| Application Layer | 210 | UI Components / 用户界面 |
| Game Engine | 220 | Pet Animation / 宠物动画引擎 |
| Points System | 230 | Rewards Logic / 积分逻辑 |
| BLE Handler | 240 | Device Communication / 设备通信 |
| Data Manager | 250 | State Storage / 状态存储 |
| Session Controller | 260 | Focus Timer / 专注计时器 |
| API Client | 270 | Cloud Sync / 云端同步 |
| Cloud Server | 300 | Backend Services / 后端服务 |

---

## Key Features | 核心功能

### 1. Smart Detection | 智能检测
- Multi-sensor array for accurate phone placement recognition
- 多传感器阵列实现精准手机放置识别

### 2. Virtual Pet Growth | 虚拟宠物成长
- Real-time pet animation tied to focus duration
- 虚拟宠物与专注时长实时联动

### 3. Progressive Rewards | 渐进式奖励
- Points economy for unlocking skins and pets
- 积分经济系统解锁皮肤和宠物

### 4. Usage Analytics | 使用分析
- Daily/weekly statistics and streak tracking
- 每日/每周统计与连续天数追踪

### 5. Cloud Synchronization | 云端同步
- Cross-device data persistence
- 跨设备数据持久化

---

## Mobile App Screens | 移动应用界面

1. **Home Dashboard** - Current pet, points, streak, quick actions
   - 首页仪表盘 - 当前宠物、积分、连续天数、快捷操作

2. **Focus Session** - Active timer, pet growth animation, real-time rewards
   - 专注会话 - 计时器、宠物成长动画、实时奖励

3. **Pet Shop** - Available pets, skins, items for purchase
   - 宠物商店 - 可购买的宠物、皮肤、道具

4. **Statistics** - Weekly overview, achievements, session history
   - 统计页面 - 周概览、成就、会话历史

5. **Settings** - Device connection, focus settings, app preferences
   - 设置页面 - 设备连接、专注设置、应用偏好

---

## Technical Specifications | 技术规格

### Hardware
- **MCU:** ESP32-C3 (BLE 5.0 + WiFi)
- **Sensors:** Force-sensitive resistor, IR proximity, Capacitive touch
- **Power:** 2000mAh Li-Po battery, USB-C charging
- **Connectivity:** Bluetooth Low Energy 5.0

### Software
- **Mobile:** iOS 15+ / Android 12+ (React Native)
- **Backend:** Node.js + Express, PostgreSQL
- **Real-time:** WebSocket for live sync
- **Cloud:** AWS/GCP infrastructure

---

## Usage | 使用方法

1. Open `index.html` in any modern web browser
2. Scroll through the research paper layout
3. View diagrams for system architecture
4. Horizontally scroll to preview all mobile app screens

---

1. 在任意现代浏览器中打开 `index.html`
2. 滚动浏览研究论文布局
3. 查看系统架构图表
4. 横向滚动预览所有移动应用界面

---

## Target Audience | 目标用户

- **Students** - Improve study focus / 提升学习专注力
- **Professionals** - Enhance work productivity / 提高工作效率
- **Parents** - Monitor children's screen time / 监控儿童屏幕时间
- **Digital wellness advocates** - Healthier phone habits / 更健康的手机使用习惯

---

## Business Model | 商业模式

1. **Hardware Sales** - Smart phone holder device
2. **Premium Subscription** - Advanced features, exclusive pets
3. **In-app Purchases** - Special skins and items
4. **Enterprise Licensing** - Workplace productivity solutions

---

## License | 许可

This prototype is created for demonstration and investment presentation purposes.

本原型为技术演示和投资展示用途。

---

© 2024 FocusPet Project
