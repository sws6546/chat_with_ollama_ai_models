-- CreateTable
CREATE TABLE `Message` (
    `message_id` VARCHAR(191) NOT NULL,
    `chat_id` VARCHAR(191) NOT NULL,
    `message_author` VARCHAR(191) NOT NULL,
    `message_content` VARCHAR(191) NOT NULL,
    `message_addedDate` DATETIME(3) NOT NULL,
    `message_modelBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`message_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
