# Normally Presentation

โปรเจกต์นี้เป็น Angular standalone app สำหรับทดลองและต่อยอดหน้า presentation โดยวาง architecture แบบเบา ๆ ตามแนว feature-first เพื่อให้โค้ดอ่านง่าย แยกความรับผิดชอบชัด และไม่เพิ่ม abstraction เกินจำเป็นตั้งแต่ต้น

## ภาพรวม Architecture

แนวทางหลักคือแยกโค้ดตาม feature ก่อน แล้วค่อยแบ่ง layer ภายใน feature เท่าที่จำเป็น

```txt
src/app/
  core/                    # service/provider ระดับทั้งแอป
  shared/                  # UI หรือ utility ที่ reusable และไม่ผูก domain
  features/
    presentations/
      domain/              # type, model, pure business helper
      data-access/         # mock API, DTO, mapper
      ui/                  # presentational components
      pages/               # routed/container components
```

โปรเจกต์นี้ยังไม่ใช้ NgRx, repository abstraction เต็มรูปแบบ หรือ path alias เพราะตอนนี้ sample ยังเล็ก การคงโครงสร้างให้บางทำให้แก้และเรียนรู้ได้เร็วกว่า

## กฎการวางไฟล์

ใช้ `core/` เมื่อโค้ดนั้นเป็นของทั้งแอป เช่น provider, global service, interceptor, guard หรือ config ที่หลาย feature ต้องใช้

ใช้ `shared/` เมื่อโค้ด reusable และไม่รู้จัก business domain เช่น button, empty state, pipe หรือ directive กลาง

ใช้ `features/<feature-name>/` เมื่อโค้ดเป็นของ feature ใด feature หนึ่ง โดยแยกย่อยแบบนี้:

```txt
domain/       เก็บ type/model และ pure function ที่ test ง่าย
data-access/  เก็บ service ที่คุย data source, DTO และ mapper
ui/           เก็บ component ที่รับ input แล้วแสดงผล
pages/        เก็บ component ที่ผูกกับ route และจัดการ state ของหน้า
```

## Data Flow ของ `presentations`

หน้าแรก route ไปที่ `PresentationListPage`

```txt
route
  -> pages/PresentationListPage
  -> data-access/PresentationDataService
  -> data-access/mapPresentationDto
  -> domain/Presentation
  -> ui/PresentationList
  -> ui/PresentationCard
```

`PresentationListPage` เป็นคนดึงข้อมูลและถือ state ด้วย Angular signals ส่วน `PresentationList` และ `PresentationCard` ทำหน้าที่แสดงผลจาก input เท่านั้น

## วิธีเพิ่ม Feature ใหม่

สร้างโฟลเดอร์ใหม่ใต้ `src/app/features` เช่น `events`

```txt
features/events/
  domain/
  data-access/
  ui/
  pages/
```

แนวทางเริ่มต้น:

1. วาง type/model ใน `domain`
2. วาง service, DTO และ mapper ใน `data-access`
3. วาง component แสดงผลใน `ui`
4. วาง routed page หรือ container component ใน `pages`
5. เพิ่ม route ใน `app.routes.ts`
6. เพิ่ม test ให้ pure helper หรือ mapper ก่อน ถ้ามี business rule หรือ data mapping

## Commands

ติดตั้ง dependency:

```bash
npm install
```

รัน dev server:

```bash
npm start
```

build production:

```bash
npm run build
```

รัน unit test:

```bash
npm test
```

## Angular CLI ที่ใช้บ่อย

คำสั่งด้านล่างเป็นตัวอย่างที่เข้ากับโครงสร้างโปรเจกต์นี้โดยตรง

สร้าง page ของ feature:

```bash
npx ng generate component features/events/pages/event-list-page
```

สร้าง UI component ย่อยใน feature:

```bash
npx ng generate component features/events/ui/event-card
```

สร้าง service สำหรับ data-access:

```bash
npx ng generate service features/events/data-access/event-data
```

สร้าง interface หรือ model:

```bash
npx ng generate interface features/events/domain/event --type=model
```

สร้าง guard:

```bash
npx ng generate guard core/guards/auth
```

สร้าง pipe แบบ shared:

```bash
npx ng generate pipe shared/pipes/date-label
```

เปิดรายการ schematic ที่มีทั้งหมด:

```bash
npx ng generate --help
```

ถ้าต้องการให้ Angular สร้างแบบไม่แยกไฟล์ test หรือ style เพิ่ม option ได้ เช่น:

```bash
npx ng generate component features/events/ui/event-badge --skip-tests
```

หลัง generate page หรือ component แล้ว ให้ย้าย logic ตามกติกาเดิม:

- component ที่แสดงผลอย่างเดียวให้อยู่ใน `ui`
- component ที่ผูก route และถือ state ให้อยู่ใน `pages`
- service, DTO และ mapper ให้อยู่ใน `data-access`
- type และ pure helper ให้อยู่ใน `domain`

## Command Cookbook

ส่วนนี้เป็นชุด command ที่ค่อนข้างครบสำหรับดูแล Angular project หนึ่งตัว โดยเลือกเฉพาะคำสั่งที่เกี่ยวกับโปรเจกต์นี้จริง

### Run และ Build

รัน dev server:

```bash
npm start
```

รัน dev server พร้อม host และ port:

```bash
npx ng serve --host 0.0.0.0 --port 4200
```

build production:

```bash
npm run build
```

build แบบ development และ watch:

```bash
npm run watch
```

ดูข้อมูลเวอร์ชัน Angular/CLI:

```bash
npx ng version
```

### Generate

สร้าง page:

```bash
npx ng generate component features/events/pages/event-detail-page
```

สร้าง reusable component:

```bash
npx ng generate component shared/ui/app-shell
```

สร้าง directive:

```bash
npx ng generate directive shared/directives/auto-focus
```

สร้าง service:

```bash
npx ng generate service features/events/data-access/event-data
```

สร้าง guard:

```bash
npx ng generate guard core/guards/auth
```

สร้าง interceptor:

```bash
npx ng generate interceptor core/interceptors/api-error
```

สร้าง resolver:

```bash
npx ng generate resolver features/events/data-access/event-detail
```

สร้าง pipe:

```bash
npx ng generate pipe shared/pipes/date-label
```

สร้าง interface:

```bash
npx ng generate interface features/events/domain/event
```

สร้าง model type:

```bash
npx ng generate interface features/events/domain/event --type=model
```

สร้าง enum:

```bash
npx ng generate enum features/events/domain/event-status
```

ดูรายการ schematic ทั้งหมด:

```bash
npx ng generate --help
```

### Options ที่ใช้บ่อยตอน Generate

สร้าง component โดยไม่สร้าง test:

```bash
npx ng generate component features/events/ui/event-badge --skip-tests
```

สร้าง component แบบ inline template และ style:

```bash
npx ng generate component shared/ui/status-chip --inline-template --inline-style
```

สร้าง component แบบ export class สั้นลงตาม alias:

```bash
npx ng g c features/events/ui/event-card
```

### Test และ Check

รัน unit test:

```bash
npm test
```

ตรวจ TypeScript ของ app:

```bash
npx tsc -p tsconfig.app.json --noEmit
```

ตรวจ TypeScript ของ test:

```bash
npx tsc -p tsconfig.spec.json --noEmit
```

ตรวจ config ที่ TypeScript ใช้งานจริง:

```bash
npx tsc -p tsconfig.spec.json --showConfig
```

### Maintenance

ดู dependency ที่ outdated:

```bash
npm outdated
```

อัปเดต Angular CLI และ Angular packages:

```bash
npx ng update @angular/core @angular/cli
```

ติดตั้ง package ใหม่ในโปรเจกต์:

```bash
npm install <package-name>
```

ลบ package ออกจากโปรเจกต์:

```bash
npm uninstall <package-name>
```

เพิ่ม Angular integration จาก package ที่รองรับ `ng add`:

```bash
npx ng add <package-name>
```

## Testing

ควร test อย่างน้อย 3 จุดตามระดับความเสี่ยง:

- `domain`: test pure function เช่น status label หรือ filter rule
- `data-access`: test mapper เพื่อกัน API shape หลุดเข้า UI
- `pages/ui`: test component เฉพาะ behavior สำคัญ ไม่ต้อง test ทุก class ของ CSS

ถ้า logic เริ่มเยอะ ให้ย้าย logic ออกจาก component ไปอยู่ `domain` หรือ service ก่อน แล้วค่อยเขียน test ตรงนั้น
