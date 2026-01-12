# HopeLink: Anonymous Resource Portal for Homeless Individuals

**HopeLink：无家可归者匿名资源门户系统**

---

## Abstract | 摘要

**English:**
HopeLink is an innovative public kiosk application designed to provide anonymous, barrier-free access to social services for homeless individuals in urban transit environments. The system addresses critical gaps in traditional social service delivery by eliminating requirements for identification, appointments, or digital literacy. Through an intuitive touch-based interface supporting multiple languages, HopeLink connects vulnerable populations with shelters, food resources, healthcare, employment services, and legal aid within three simple interactions. The platform incorporates intelligent triage algorithms, real-time resource matching, and a novel volunteer coordination system while maintaining complete user anonymity. Analytics capabilities enable evidence-based policy decisions while preserving individual privacy through aggregated, de-identified data collection.

**中文：**
HopeLink是一款创新的公共信息亭应用程序，旨在为城市交通环境中的无家可归者提供匿名、无障碍的社会服务访问。该系统通过消除对身份证明、预约或数字素养的要求，解决了传统社会服务交付中的关键缺口。通过支持多种语言的直观触摸界面，HopeLink在三次简单交互内将弱势群体与庇护所、食品资源、医疗保健、就业服务和法律援助联系起来。该平台整合了智能分诊算法、实时资源匹配和新颖的志愿者协调系统，同时保持用户完全匿名。分析功能通过聚合、去标识化的数据收集，在保护个人隐私的同时支持循证政策决策。

---

## Keywords | 关键词

`Public Kiosk` `Homeless Services` `Anonymous Access` `Resource Matching` `Volunteer Coordination` `Multi-language Support` `Social Services` `Urban Computing` `Human-Computer Interaction` `Privacy-Preserving Analytics`

`公共信息亭` `无家可归者服务` `匿名访问` `资源匹配` `志愿者协调` `多语言支持` `社会服务` `城市计算` `人机交互` `隐私保护分析`

---

## 1. Introduction | 引言

### 1.1 Problem Statement | 问题陈述

Traditional social service access presents significant barriers for homeless individuals:
- **Identification Requirements**: Many services require government ID, which homeless individuals often lack
- **Appointment Systems**: Complex scheduling systems assume stable communication access
- **Digital Divide**: Smartphone-based solutions exclude those without devices or data plans
- **Language Barriers**: Services often only available in dominant languages
- **Stigma and Privacy Concerns**: Fear of judgment prevents help-seeking behavior

传统社会服务访问对无家可归者存在显著障碍：
- **身份证明要求**：许多服务需要政府ID，而无家可归者通常缺乏
- **预约系统**：复杂的调度系统假设稳定的通信访问
- **数字鸿沟**：基于智能手机的解决方案排斥没有设备或数据计划的人
- **语言障碍**：服务通常只提供主要语言
- **污名化和隐私顾虑**：对评判的恐惧阻止寻求帮助的行为

### 1.2 Proposed Solution | 提出的解决方案

HopeLink deploys touch-screen kiosks in high-traffic urban locations (subway stations, bus terminals, libraries) offering:
- **Zero-barrier access**: No login, no ID, no phone required
- **3-step interaction model**: Category → Triage → Results
- **Multi-language support**: 6+ languages with icon-based navigation
- **Printable action cards**: Take-away information with maps and contacts
- **Volunteer bridge**: Human assistance when needed, without compromising anonymity

HopeLink在高流量城市位置（地铁站、公交枢纽、图书馆）部署触摸屏信息亭，提供：
- **零门槛访问**：无需登录、无需ID、无需手机
- **3步交互模型**：类别 → 分诊 → 结果
- **多语言支持**：6种以上语言，配合基于图标的导航
- **可打印行动卡**：包含地图和联系方式的带走信息
- **志愿者桥梁**：在需要时提供人工帮助，不影响匿名性

---

## 2. System Architecture | 系统架构

### 2.1 High-Level Components | 高级组件

```
┌─────────────────────────────────────────────────────────────┐
│                    HOPELINK SYSTEM                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Kiosk     │  │  Resource   │  │  Volunteer  │         │
│  │  Interface  │  │   Database  │  │   Mobile    │         │
│  │   (iPad)    │  │   (Cloud)   │  │    App      │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          │                                  │
│                  ┌───────┴───────┐                         │
│                  │  API Gateway  │                         │
│                  │   + ML Engine │                         │
│                  └───────┬───────┘                         │
│                          │                                  │
│                  ┌───────┴───────┐                         │
│                  │   Analytics   │                         │
│                  │   Dashboard   │                         │
│                  └───────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Core Modules | 核心模块

| Module | Function | Privacy Level |
|--------|----------|---------------|
| User Interface | Touch-optimized kiosk screens | No data collected |
| Triage Engine | Smart question routing | Session-only |
| Resource Matcher | Real-time availability matching | Anonymous queries |
| Action Card Generator | PDF creation with QR codes | No storage |
| Volunteer Coordinator | Request routing to volunteers | Pseudonymous |
| Analytics Collector | Aggregate usage statistics | Fully de-identified |

| 模块 | 功能 | 隐私级别 |
|------|------|----------|
| 用户界面 | 触摸优化的信息亭屏幕 | 不收集数据 |
| 分诊引擎 | 智能问题路由 | 仅限会话 |
| 资源匹配器 | 实时可用性匹配 | 匿名查询 |
| 行动卡生成器 | 带QR码的PDF创建 | 无存储 |
| 志愿者协调器 | 请求路由到志愿者 | 假名化 |
| 分析收集器 | 聚合使用统计 | 完全去标识化 |

---

## 3. User Flow Design | 用户流程设计

### 3.1 Primary User Journey | 主要用户旅程

```
START
  │
  ▼
┌─────────────────┐
│ Language Select │  ← 6 languages, large touch targets
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Category Select │  ← Shelter, Food, Health, Jobs, Legal, Other
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Triage Questions│  ← 2-4 quick questions (optional)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Resource Results│  ← Top 3 matches with availability
└────────┬────────┘
         │
         ├──────────────┬──────────────┐
         ▼              ▼              ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Print Card  │  │ Request     │  │ Start Over  │
│             │  │ Volunteer   │  │             │
└─────────────┘  └─────────────┘  └─────────────┘
```

### 3.2 Screen Inventory | 屏幕清单

1. **Welcome/Language Selection** - 欢迎/语言选择
2. **Need Category Selection** - 需求类别选择
3. **Triage Questions** - 分诊问题
4. **Resource Matching Results** - 资源匹配结果
5. **Action Card Output** - 行动卡输出
6. **Volunteer Request** - 志愿者请求
7. **Analytics Dashboard** (Admin) - 分析仪表板（管理员）

---

## 4. MVP Features | 最小可行产品功能

### Feature 1: Ultra-Low Barrier Request (3 Steps)
### 功能1：超低门槛请求（3步）

- No account creation required
- No personal information collected
- Large, accessible touch targets (minimum 48x48px)
- Icon + text labels for low literacy users
- Session automatically expires after 5 minutes of inactivity

### Feature 2: Intelligent Triage
### 功能2：智能分诊

- Dynamic question trees based on category selection
- "I'm not sure" always available as an option
- Skip functionality for sensitive questions
- Quick-info tooltips for complex terms

### Feature 3: Real-Time Resource Matching
### 功能3：实时资源匹配

- Integration with shelter bed availability APIs
- Food bank hours and current capacity
- Healthcare clinic wait times
- Distance calculation from kiosk location
- Accessibility information (wheelchair, pets, families)

### Feature 4: Printable Action Card
### 功能4：可打印行动卡

- One-page PDF with selected resource details
- Walking directions with estimated time
- QR code linking to mobile-friendly map
- Backup options if primary resource unavailable
- Valid for 24 hours (prevents outdated information)

### Feature 5: Volunteer Ticketing System
### 功能5：志愿者票务系统

- Request types: Escort, Phone call, Translation, Conversation
- Volunteer matching based on availability and skills
- Estimated wait time display
- Option to wait at kiosk or provide callback number
- All volunteers background-checked through partner orgs

### Feature 6: Privacy-Preserving Analytics
### 功能6：隐私保护分析

Collected metrics (all aggregated, never individual):
- Request category distribution
- Peak usage times
- Resource match success rates
- Volunteer response times
- Language preference distribution
- Triage question completion rates

收集的指标（全部聚合，从不单独）：
- 请求类别分布
- 峰值使用时间
- 资源匹配成功率
- 志愿者响应时间
- 语言偏好分布
- 分诊问题完成率

---

## 5. Technical Specifications | 技术规格

### 5.1 Hardware Requirements | 硬件要求

| Component | Specification |
|-----------|---------------|
| Display | 12.9" iPad Pro (landscape orientation) |
| Enclosure | Vandal-resistant steel kiosk |
| Printer | Thermal receipt printer (weatherproof) |
| Connectivity | Cellular + WiFi failover |
| Power | UPS battery backup (4 hours) |

### 5.2 Software Stack | 软件栈

```
Frontend:    HTML5 + Tailwind CSS + Vanilla JS
Backend:     Node.js + Express
Database:    PostgreSQL (resources) + Redis (sessions)
Analytics:   Apache Kafka + ClickHouse
Deployment:  Docker + Kubernetes
CDN:         Cloudflare (static assets)
```

### 5.3 Accessibility Standards | 无障碍标准

- WCAG 2.1 AA compliance
- Minimum touch target: 48x48 pixels
- Color contrast ratio: 4.5:1 minimum
- Screen reader compatible
- Audio feedback option
- High contrast mode available

---

## 6. Privacy Architecture | 隐私架构

### 6.1 Data Minimization Principles | 数据最小化原则

```
┌─────────────────────────────────────────────────────────┐
│                  DATA HANDLING                          │
├─────────────────────────────────────────────────────────┤
│  NEVER COLLECTED          │  SESSION ONLY (auto-delete) │
│  ─────────────────        │  ─────────────────────────  │
│  • Name                   │  • Selected language        │
│  • Photo/biometrics       │  • Category choices         │
│  • Government ID          │  • Triage responses         │
│  • Home address           │  • Resource selections      │
│  • Social Security #      │  • Volunteer request status │
│  • Phone (unless given)   │                             │
├─────────────────────────────────────────────────────────┤
│  AGGREGATED ANALYTICS (de-identified, k-anonymity ≥10)  │
│  ──────────────────────────────────────────────────────  │
│  • Hourly usage counts    • Category distribution       │
│  • Language preferences   • Resource popularity         │
│  • Average session length • Volunteer response metrics  │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Security Measures | 安全措施

- All kiosk-to-server communication encrypted (TLS 1.3)
- Session tokens expire after 5 minutes of inactivity
- No cookies or persistent storage on device
- Daily security audit logs
- Volunteer access via separate authenticated portal

---

## 7. Research Questions | 研究问题

This project enables investigation of several research questions:

### RQ1: Access Patterns
How do usage patterns vary by time of day, season, and weather conditions?

### RQ2: Service Gaps
Which resource categories show highest demand vs. lowest availability?

### RQ3: Language Equity
Do language preferences correlate with service utilization success?

### RQ4: Volunteer Effectiveness
What factors predict successful volunteer-user interactions?

### RQ5: System Usability
How does session completion rate vary across user demographics (inferred from language/category choices)?

---

## 8. Deployment Strategy | 部署策略

### Phase 1: Pilot (3 months)
- 5 kiosks in high-traffic subway stations
- Partner with 2 shelter networks, 3 food banks
- 20 trained volunteers
- Weekly iteration based on usage data

### Phase 2: Expansion (6 months)
- 25 kiosks across transit network
- Integration with city 311 system
- Healthcare and legal aid partnerships
- Volunteer recruitment campaign

### Phase 3: Scale (12 months)
- Multi-city deployment framework
- Open-source kiosk software release
- Research partnership with universities
- Policy recommendation white papers

---

## 9. Success Metrics | 成功指标

| Metric | Target | Measurement |
|--------|--------|-------------|
| Daily unique sessions | 50+ per kiosk | Analytics |
| Session completion rate | >70% | Analytics |
| Resource match rate | >85% | Analytics |
| Volunteer response time | <20 minutes | System logs |
| User satisfaction | >4.0/5.0 | Optional survey |
| Action card print rate | >40% of sessions | Printer logs |

---

## 10. Ethical Considerations | 伦理考量

### 10.1 Dignity-Centered Design | 以尊严为中心的设计

- No judgmental language or imagery
- Positive, empowering framing ("Find resources" not "Get help")
- Equal treatment regardless of category selected
- No tracking or profiling of individuals

### 10.2 Stakeholder Involvement | 利益相关者参与

- Co-design sessions with homeless individuals
- Input from shelter staff and social workers
- Review by privacy advocates
- Accessibility testing with disability community

### 10.3 Potential Risks & Mitigations | 潜在风险与缓解

| Risk | Mitigation |
|------|------------|
| Misuse by bad actors | Vandal-resistant hardware, security cameras nearby |
| Outdated resource info | Real-time API integration, daily manual review |
| Volunteer safety | Background checks, public meeting locations only |
| Digital exclusion | Always offer printed card as takeaway |
| Privacy breach | No PII collected, encrypted transit, regular audits |

---

## 11. File Structure | 文件结构

```
HopeLink/
├── index.html              # Main showcase page
├── README.md               # This documentation
├── diagram_usecase.html    # Use case diagram
├── diagram_technical.html  # Technical architecture diagram
├── screen_welcome.html     # Language selection screen
├── screen_category.html    # Need category selection
├── screen_triage.html      # Triage questions flow
├── screen_results.html     # Resource matching results
├── screen_actioncard.html  # Printable action card
├── screen_volunteer.html   # Volunteer request system
└── screen_dashboard.html   # Analytics dashboard (admin)
```

---

## 12. References | 参考文献

1. National Alliance to End Homelessness. (2024). "State of Homelessness Report."
2. HUD Exchange. (2024). "Homeless Management Information System (HMIS) Standards."
3. WCAG 2.1 Guidelines. W3C Recommendation.
4. Toyama, K. (2015). "Geek Heresy: Rescuing Social Change from the Cult of Technology."
5. Dourish, P. & Bell, G. (2011). "Divining a Digital Future: Mess and Mythology in Ubiquitous Computing."

---

## License | 许可证

This project design is released under the MIT License for educational and non-commercial use.

本项目设计根据MIT许可证发布，用于教育和非商业用途。

---

## Contact | 联系方式

For questions about this project design, please open an issue in the repository.

如有关于此项目设计的问题，请在仓库中提交issue。

---

*Last Updated: January 2026*
*最后更新：2026年1月*
