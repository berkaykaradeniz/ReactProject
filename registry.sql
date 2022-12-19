-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 19 Ara 2022, 21:42:35
-- Sunucu sürümü: 10.4.22-MariaDB
-- PHP Sürümü: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `registry`
--
CREATE DATABASE IF NOT EXISTS `registry` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `registry`;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `form`
--

CREATE TABLE `form` (
  `id` int(11) NOT NULL,
  `fullname` varchar(25) NOT NULL,
  `email` text NOT NULL,
  `phonenumber` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `form`
--

INSERT INTO `form` (`id`, `fullname`, `email`, `phonenumber`) VALUES
(1, 'aa', 'aaa@hotmail.com', ' 905343528824'),
(2, 'bbb', 'bbb@hotmail.com', ' 905343528824'),
(3, 'test1', 'test1@gmail.com', ' 905555555555'),
(4, 'berkay mert', 'berkaymert@gmail.com', ' 905555555555'),
(5, 'ahmet', 'ahmet@ahmet.com', ' 905555555557'),
(6, 'cem', 'cemkara@hotmail.com', ' 905555553322'),
(7, 'selim', 'selimss@hotmail.com', ' 12024561111');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `form`
--
ALTER TABLE `form`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `form`
--
ALTER TABLE `form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
