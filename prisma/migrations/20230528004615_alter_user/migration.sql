-- AlterTable
ALTER TABLE `user` MODIFY `permition` ENUM('Admin', 'User') NULL DEFAULT 'User';
