# Todo Web App with Calendar Plan

## Overview

โปรเจกต์นี้จะพัฒนาเป็นเว็บแอปจัดการงานที่มีทั้งมุมมองแบบรายการและปฏิทิน โดยเน้นการประยุกต์ใช้หลักการ OOP ทั้ง 4 ข้อในงานเดียว:

- Abstraction
- Encapsulation
- Inheritance
- Polymorphism

เป้าหมายคือทำระบบที่ใช้งานได้จริง ขอบเขตไม่ใหญ่เกินไป และอธิบายแนวคิด OOP ได้ชัดในโค้ด

## Product Idea

ผู้ใช้สามารถ:

- สร้าง task
- แก้ไข task
- ลบ task
- เปลี่ยนสถานะ task
- ดู task แบบ list
- ดู task แบบ calendar
- filter task ตามประเภท, สถานะ และวัน

ระบบจะรองรับ task หลายประเภท เพื่อให้เกิด behavior ที่ต่างกันจริง เช่น:

- `TodoTask`
- `MeetingTask`
- `DeadlineTask`

## OOP Mapping

### 1. Abstraction

ใช้ `abstract class Task` เป็นแกนกลางของระบบ โดยกำหนด behavior ร่วมที่ task ทุกประเภทต้องมี เช่น:

- `getTypeLabel()`
- `getDisplayDate()`
- `canAppearOnCalendar()`

UI และ service ชั้นบนจะทำงานผ่าน type กลาง `Task` โดยไม่ต้องรู้รายละเอียดภายในของแต่ละชนิด

### 2. Encapsulation

ซ่อน state ภายใน object เช่น:

- สถานะของ task
- เงื่อนไขการ mark complete
- เงื่อนไขการ reopen

การเปลี่ยน state จะทำผ่าน method เช่น:

- `markComplete()`
- `reopen()`
- `reschedule()`

ไม่เปิดให้ภายนอกแก้ property สำคัญตรง ๆ

### 3. Inheritance

สืบทอดจาก `Task` ไปเป็นหลายประเภท:

- `TodoTask`
- `MeetingTask`
- `DeadlineTask`

แต่ละ subclass มี behavior ของตัวเอง เช่น:

- `MeetingTask` มี `startAt` และ `endAt`
- `DeadlineTask` เน้น due date
- `TodoTask` อาจไม่มีช่วงเวลาแบบ meeting

### 4. Polymorphism

เก็บ task ทุกชนิดใน `Task[]` ชุดเดียว แล้วเรียก method เดียวกันได้ เช่น:

- `getTypeLabel()`
- `getDisplayDate()`
- `canAppearOnCalendar()`

calendar view และ list view สามารถ render task ต่างชนิดได้ผ่าน interface กลางเดียวกัน

## Scope

### In Scope

- หน้าแสดงรายการ task
- หน้าสร้างและแก้ไข task
- มุมมอง calendar รายเดือนหรือรายสัปดาห์แบบเรียบง่าย
- task 3 ประเภท
- เปลี่ยนสถานะ task
- filter ตามประเภท, สถานะ และวัน
- mock data หรือ local state ก่อน ยังไม่ต้องต่อ backend จริง

### Out of Scope

- login
- multi-user
- drag and drop บน calendar
- notification จริง
- recurring task
- sync กับ Google Calendar

## Domain Model

### Base Class

`Task`

field หลัก:

- `id`
- `title`
- `description`
- `status`
- `category`

method หลัก:

- `getTypeLabel()`
- `getDisplayDate()`
- `canAppearOnCalendar()`
- `markComplete()`
- `reopen()`

### Subclasses

`TodoTask`

- ใช้ due date ธรรมดา
- เหมาะกับงานทั่วไป

`MeetingTask`

- มี `startAt`
- มี `endAt`
- แสดงใน calendar เป็นช่วงเวลา

`DeadlineTask`

- มี due date ชัดเจน
- ใช้แสดง deadline สำคัญ

### Supporting Types

- `TaskStatus`
- `TaskCategory`
- `TaskType`

## Features

### 1. Task List

- แสดงรายการ task ทั้งหมด
- filter ตาม status
- filter ตาม type
- filter ตามวันที่
- ปุ่ม mark complete / reopen

### 2. Task Form

- สร้าง task ใหม่
- เลือกประเภท task
- render field ตามประเภท
- validate ข้อมูลพื้นฐาน

### 3. Calendar View

- แสดง task ตามวัน
- แยก task ที่มีเวลาและไม่มีเวลา
- คลิกที่วันเพื่อดูรายการ task ของวันนั้น

### 4. Task Mapper / Factory

- รับ raw form value หรือ DTO
- สร้าง instance ของ class ที่ถูกต้องตาม `taskType`
- ใช้เป็นจุดรวม logic การสร้าง object

## Suggested Angular Structure

```txt
src/app/
  core/
  shared/
  features/
    tasks/
      domain/
        task.model.ts
        task-status.type.ts
        task-type.type.ts
        todo-task.model.ts
        meeting-task.model.ts
        deadline-task.model.ts
        task.factory.ts
      data-access/
        task.repository.ts
        task.mock-data.ts
      ui/
        task-list/
        task-card/
        task-filters/
        calendar-grid/
        task-form/
      pages/
        task-list-page/
        calendar-page/
```

## Implementation Notes

- ใช้ Angular standalone components
- ใช้ signals สำหรับ UI state
- แยก business logic ไว้ใน `domain`
- ใช้ factory ในการแปลง form data เป็น subclass ที่ถูกต้อง
- เริ่มจาก mock repository ก่อน แล้วค่อยเปลี่ยนเป็น API ภายหลัง

## Development Order

1. วาง domain model และ subclasses
2. สร้าง task factory
3. สร้าง mock repository
4. ทำ list page
5. ทำ form สำหรับ create/edit
6. ทำ calendar page
7. เพิ่ม filter และ action เปลี่ยนสถานะ
8. เขียน test ของ domain และ factory

## Testing Plan

- test `Task` subclasses ว่าแต่ละ type ตอบ behavior ถูกต้อง
- test `markComplete()` และ `reopen()`
- test factory ว่าสร้าง subclass ถูกต้อง
- test calendar mapping ว่า task ไปอยู่วันที่ถูกต้อง
- test component สำคัญของ list และ form

## Success Criteria

ถือว่างานนี้สำเร็จเมื่อ:

- สร้าง task ได้อย่างน้อย 3 ประเภท
- list view และ calendar view ใช้งานได้
- มีการใช้ OOP 4 หลักชัดเจนในโค้ด
- domain logic สำคัญมี test
- โครงสร้าง Angular อ่านง่ายและต่อยอดได้
