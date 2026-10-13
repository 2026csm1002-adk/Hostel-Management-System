CREATE TABLE `attachment` (
	`attachment_id` text PRIMARY KEY NOT NULL,
	`storage_file_id` text NOT NULL,
	`file_name` text NOT NULL,
	`uploaded_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cleaning_booking` (
	`booking_id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`hostel_id` text NOT NULL,
	`floor` integer NOT NULL,
	`room_no` text NOT NULL,
	`booking_date` text NOT NULL,
	`slot_start` text NOT NULL,
	`seat` integer NOT NULL,
	`status` text NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`hostel_id`) REFERENCES `hostel`(`hostel_id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "cleaning_seat_check" CHECK("cleaning_booking"."seat" BETWEEN 1 AND 3),
	CONSTRAINT "cleaning_status_check" CHECK("cleaning_booking"."status" IN ('Confirmed', 'Done'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cleaning_slot_unique` ON `cleaning_booking` (`hostel_id`,`floor`,`booking_date`,`slot_start`,`seat`);--> statement-breakpoint
CREATE TABLE `complaint` (
	`complaint_id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text NOT NULL,
	`resolved_at` text,
	`reregistered_from` text,
	FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reregistered_from`) REFERENCES `complaint`(`complaint_id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "complaint_status_check" CHECK("complaint"."status" IN ('Open', 'InProgress', 'Resolved'))
);
--> statement-breakpoint
CREATE TABLE `hostel` (
	`hostel_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	CONSTRAINT "hostel_type_check" CHECK("hostel"."type" IN ('Boys', 'Girls'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `hostel_name_unique` ON `hostel` (`name`);--> statement-breakpoint
CREATE TABLE `staff_user` (
	`staff_id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`google_email` text NOT NULL,
	`role` text NOT NULL,
	`hostel_id` text,
	FOREIGN KEY (`hostel_id`) REFERENCES `hostel`(`hostel_id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "staff_role_check" CHECK("staff_user"."role" IN ('Caretaker', 'Supervisor', 'Warden'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `staff_user_google_email_unique` ON `staff_user` (`google_email`);--> statement-breakpoint
CREATE TABLE `student` (
	`student_id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`google_email` text NOT NULL,
	`hostel_id` text NOT NULL,
	`wing` text NOT NULL,
	`room_no` text NOT NULL,
	`course` text NOT NULL,
	`batch` text NOT NULL,
	FOREIGN KEY (`hostel_id`) REFERENCES `hostel`(`hostel_id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "student_course_check" CHECK("student"."course" IN ('BTech', 'MTech', 'PhD', 'Other'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `student_google_email_unique` ON `student` (`google_email`);--> statement-breakpoint
CREATE TABLE `swap_request` (
	`swap_id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`reason` text NOT NULL,
	`attachment_id` text,
	`status` text NOT NULL,
	`assigned_room` text,
	`caretaker_id` text,
	`warden_id` text,
	`warden_comment` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`attachment_id`) REFERENCES `attachment`(`attachment_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`caretaker_id`) REFERENCES `staff_user`(`staff_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`warden_id`) REFERENCES `staff_user`(`staff_id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "swap_status_check" CHECK("swap_request"."status" IN ('Pending', 'Forwarded', 'Accepted', 'AwaitingRoom', 'RoomAssigned', 'Rejected', 'Waiting'))
);
