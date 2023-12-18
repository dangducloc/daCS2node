-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2023 at 01:27 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodedacs2`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `pass` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `pass`) VALUES
(1, 'admin', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `STT` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `IDFood` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `Total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `idBL` int(11) NOT NULL,
  `IDUser` int(11) NOT NULL,
  `IDFood` int(11) NOT NULL,
  `Date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`idBL`, `IDUser`, `IDFood`, `Date`, `Comment`) VALUES
(1, 1, 16, '2023-11-13 16:02:45', 'Howdy'),
(2, 1, 8, '2023-12-01 14:48:07', 'kkkkkk\nsdfsdfs'),
(3, 1, 6, '2023-12-10 09:23:21', 'demoo');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `IDFood` int(11) NOT NULL,
  `Food` varchar(150) NOT NULL,
  `Price` int(11) NOT NULL,
  `Amount` int(11) NOT NULL DEFAULT 50,
  `TypeID` int(11) NOT NULL,
  `img_src` varchar(150) NOT NULL,
  `info_Detail` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`IDFood`, `Food`, `Price`, `Amount`, `TypeID`, `img_src`, `info_Detail`) VALUES
(1, 'Pear cake', 20, 43, 2, 'assets/imgs/gallary-1.jpg', '<p><strong>Infomation:</strong></p><p>Pear cake is a delicious dessert made with fresh pears and a moist cake batter. It typically consists of sliced or diced pears mixed into the batter and baked until golden brown. The pears add a sweet and juicy flavor to the cake, making it a popular choice for those who enjoy fruity desserts. You can find various recipes for pear cake online, which may include additional ingredients such as spices, nuts, or a glaze. It\'s a delightful treat that can be enjoyed on its own or served with a dollop of whipped cream or a scoop of vanilla ice cream.</p><p><strong>Ingredients:</strong></p><ul><li>2 cups all-purpose flour</li><li>1 1/2 teaspoons baking powder</li><li>1/2 teaspoon baking soda</li><li>1/2 teaspoon salt</li><li>1/2 teaspoon ground cinnamon</li><li>1/4 teaspoon ground nutmeg</li><li>1/2 cup unsalted butter, softened</li><li>1 cup granulated sugar</li><li>2 large eggs</li><li>1 teaspoon vanilla extract</li><li>1/2 cup buttermilk</li><li>2 ripe pears, peeled, cored, and chopped<br><strong>Instructions:</strong></li></ul><ol><li>Preheat your oven to 350°F (175°C) and grease a 9-inch round cake pan.</li><li>In a medium bowl, whisk together the flour, baking powder, baking soda, salt, cinnamon, and nutmeg.</li><li>In a separate large bowl, cream together the softened butter and sugar until light and fluffy.</li><li>Beat in the eggs one at a time, then stir in the vanilla extract.</li><li>Gradually add the dry ingredient mixture to the butter mixture, alternating with the buttermilk. Mix until just combined.</li><li>Gently fold in the chopped pears.<br>Pour the batter into the prepared cake pan and smooth the top with a spatula.<br>Bake for about 40-45 minutes, or until a toothpick inserted into the center comes out clean.</li><li>Remove from the oven and let the cake cool in the pan for about 10 minutes before transferring it to a wire rack to cool completely.</li><li>Once cooled, you can dust the cake with powdered sugar or drizzle with a glaze if desired.<br>Slice and serve the pear cake as a delightful dessert.</li></ol>'),
(2, 'Salad nuts and berries', 15, 43, 4, 'assets/imgs/gallary-2.jpg', '<p>Salad nuts and berries are popular ingredients in various types of salads. Here\'s some information about them:</p><ol><li>Salad: Salad refers to a dish made primarily of vegetables, fruits, or a combination of both. It is often served as an appetizer or side dish.</li><li>Nuts: Nuts are nutrient-dense foods that can add texture and flavor to salads. Common nuts used in salads include almonds, walnuts, pecans, and cashews. They provide healthy fats, protein, and various vitamins and minerals.</li><li>Berries: Berries are small, juicy fruits that are commonly used in salads for their vibrant colors and sweet-tart flavors. Examples of berries used in salads include strawberries, blueberries, raspberries, and blackberries. They are rich in antioxidants, fiber, and vitamins.</li></ol><p>When using salad nuts and berries, you can mix them with leafy greens, other vegetables, cheese, and dressings to create a delicious and nutritious salad. Feel free to experiment with different combinations to suit your taste preferences.</p>'),
(3, 'Fruit salad with cheese and ham', 15, 49, 4, 'assets/imgs/gallary-3.jpg', '<p>Fruit salad with cheese and ham is a delicious and savory dish that combines the sweetness of fruits with the richness of cheese and ham. Here\'s some information about it:</p><p><strong>Ingredients:</strong></p><ul><li>Assorted fruits (such as apples, grapes, oranges, and pineapples)</li><li>Cheese (such as cheddar, Swiss, or feta)</li><li>Ham (cooked and diced)</li><li>Optional: Nuts (such as walnuts or almonds)</li><li>Optional: Dressing (such as honey mustard or balsamic vinaigrette)</li></ul><p><strong>Preparation:</strong></p><ol><li>Wash and prepare the fruits by cutting them into bite-sized pieces.</li><li>Cube or shred the cheese according to your preference.</li><li>Cook and dice the ham into small pieces.</li><li>If using nuts, chop them into smaller pieces.</li><li>In a large bowl, combine the fruits, cheese, ham, and nuts (if desired).</li><li>Toss everything together gently to mix well.</li><li>If desired, drizzle your preferred dressing over the salad and toss again.</li></ol>'),
(4, 'Guacamole', 10, 44, 4, 'assets/imgs/gallary-4.jpg', '<p><strong>Ingredients:</strong></p><ul><li>Ripe avocados.</li><li>Lime or lemon juice.</li><li>Red onion, finely chopped.</li><li>Tomato, diced.</li><li>Fresh cilantro, chopped.</li><li>Jalapeno or serrano pepper, finely chopped (optional).</li><li>Salt and pepper to taste.</li><li>Garlic powder or minced garlic (optional).</li></ul><p><strong>Preparation:</strong></p><ol><li>Cut the avocados in half, remove the pit, and scoop out the flesh into a bowl.</li><li>Mash the avocados with a fork until desired consistency.</li><li>Add lime or lemon juice to prevent browning and enhance flavor.</li><li>Add the finely chopped red onion, diced tomato, chopped cilantro, and optional chopped jalapeno or serrano pepper.<br>Season with salt, pepper, and optional garlic powder or minced garlic.</li><li>Gently mix all the ingredients together until well combined.</li></ol>'),
(5, 'Beef steak', 30, 49, 1, 'assets/imgs/gallary-5.jpg', '<p><strong>Preparation and Cooking:</strong></p><ul><li>Before cooking, it\'s important to let the steak come to room temperature for about 30 minutes to ensure even cooking.</li><li>Season the steak with salt, pepper, and any desired additional seasonings or marinades.</li><li>Cooking methods for steak include grilling, pan-searing, broiling, or sous vide.</li><li>The cooking time will depend on the thickness of the steak and the desired level of doneness (rare, medium-rare, medium, well-done).</li></ul><p><strong>Serving:</strong></p><ul><li>Once cooked, allow the steak to rest for a few minutes to retain its juices before slicing or serving.</li><li>Steak can be enjoyed as the main course alongside side dishes like roasted vegetables, mashed potatoes, or a fresh salad.</li><li>It can also be used in sandwiches, stir-fries, or sliced for salads.</li></ul>'),
(6, 'Blueberry cake', 10, 45, 2, 'assets/imgs/gallary-6.jpg', '<ul><li>Blueberry cake is a delicious dessert that features the sweet and tart flavors of blueberries. Here are some details about it:<br>&nbsp;</li><li><strong>Ingredients:</strong> Flour, sugar, baking powder, salt, butter, eggs, milk, vanilla extract, blueberries.</li><li><strong>Preparation:</strong> Mix dry ingredients, cream butter and sugar, add eggs and vanilla extract, alternate adding dry ingredients and milk. Fold in blueberries. Bake in a preheated oven until golden brown.</li><li><strong>Serving:</strong> Allow the cake to cool before serving. Enjoy it as a dessert or a sweet treat.</li></ul>'),
(7, 'Avocado toast with poached egg', 5, 42, 4, 'assets/imgs/gallary-7.jpg', '<ul><li>Avocado toast with poached egg is a popular and nutritious breakfast or brunch option. Here\'s some information about it:</li><li><strong>Ingredients:</strong> Bread, avocado, lemon juice, salt, pepper, poached egg.</li><li><strong>Preparation:</strong> Toast bread slices. Mash avocado with lemon juice, salt, and pepper. Spread avocado mixture on the toast. Top with a poached egg.</li><li><strong>Serving:</strong> Serve as a hearty breakfast or a light meal.</li></ul>'),
(8, 'Almond Pastry Cookies', 5, 43, 2, 'assets/imgs/gallary-8.jpg', '<ul><li>Almond pastry cookies are delicious and nutty treats that can be enjoyed as snacks or desserts. Here\'s some information about them:</li><li><strong>Ingredients</strong>: Almond flour, sugar, butter, vanilla extract.</li><li><strong>Preparation</strong>: Mix almond flour and sugar. Cut in butter until crumbly. Add vanilla extract. Shape into cookies and bake until golden brown.</li><li><strong>Serving</strong>: Allow cookies to cool before serving. Enjoy them as a sweet treat with a cup of tea or coffee.</li></ul>'),
(9, 'Coconut Banana Pancakes ', 10, 50, 2, 'assets/imgs/gallary-9.jpg', '<ul><li>Coconut banana pancakes are a delicious and tropical twist on traditional pancakes. Here are some details about them:</li><li><strong>Ingredients</strong>: Flour, baking powder, salt, sugar, coconut milk, mashed bananas, eggs, vanilla extract.</li><li><strong>Preparation</strong>: Mix dry ingredients, add coconut milk, mashed bananas, eggs, and vanilla extract. Stir until well combined. Cook pancakes on a griddle or skillet until golden brown.</li><li><strong>Serving</strong>: Serve the pancakes warm with toppings like sliced bananas, shredded coconut, or maple syrup.</li></ul>'),
(10, 'Grilled salmon', 25, 49, 1, 'assets/imgs/gallary-10.jpg', '<ul><li>Grilled salmon is a delicious and healthy dish that can be enjoyed as a main course. Here are some details about it:</li><li><strong>Ingredients</strong>: Salmon fillets, olive oil, lemon juice, salt, pepper, herbs or spices (optional).</li><li><strong>Preparation</strong>: Preheat the grill. Brush salmon fillets with olive oil and season with lemon juice, salt, pepper, and optional herbs or spices. Grill the salmon until cooked through and slightly charred.</li><li><strong>Serving</strong>: Serve the grilled salmon with a side of roasted vegetables, rice, or a fresh salad.</li></ul>'),
(11, 'Foie gras', 30, 48, 1, 'assets/imgs/gallary-11.jpg', '<ul><li>Foie gras is a luxury food made from the liver of a duck or goose. Here are some details about it:</li><li><strong>Preparation</strong>: Foie gras can be seared, pan-fried, or used in various gourmet recipes. It is known for its rich and buttery flavor.</li><li><strong>Serving</strong>: Foie gras is often served as an appetizer or part of a fine dining experience. It pairs well with brioche, fruit compote, or a sweet wine.</li></ul>'),
(12, 'Buffalo wings', 25, 49, 1, 'assets/imgs/gallary-12.jpg', '<ul><li>Buffalo wings are a popular and flavorful appetizer. Here are some details about them:</li><li><strong>Ingredients</strong>: Chicken wings, hot sauce, butter, garlic powder, salt, pepper.</li><li><strong>Preparation</strong>: Preheat the oven. Bake the chicken wings until crispy. In a separate saucepan, melt butter and mix with hot sauce, garlic powder, salt, and pepper. Toss the baked wings in the sauce until coated.</li><li><strong>Serving</strong>: Serve the buffalo wings with celery sticks and blue cheese or ranch dressing for dipping. They make a great party snack or game-day treat.</li></ul>'),
(13, 'Strawberry smoothie', 5, 46, 3, 'assets/imgs/gallary-13.jpg', '<ul><li>Strawberry smoothie is a classic and delightful drink. Here are some details about it:</li><li><strong>Ingredients</strong>: Strawberries, yogurt or milk, honey or sweetener (optional), ice cubes (optional).</li><li><strong>Preparation</strong>: Blend strawberries, yogurt or milk, honey or sweetener (if desired), and ice cubes (if desired) until smooth. Adjust the consistency and sweetness according to your preference.</li><li><strong>Serving</strong>: Enjoy the strawberry smoothie chilled as a tasty breakfast option or a delicious treat.</li></ul>'),
(14, 'Black berries smoothie', 5, 50, 3, 'assets/imgs/gallary-14.jpg', '<ul><li>Blackberry smoothie is a refreshing and nutritious beverage. Here are some details about it:</li><li><strong>Ingredients</strong>: Blackberries, yogurt or milk, honey or sweetener (optional), ice cubes (optional).</li><li><strong>Preparation</strong>: Blend blackberries, yogurt or milk, honey or sweetener (if desired), and ice cubes (if desired) until smooth. Adjust the consistency and sweetness according to your preference.</li><li><strong>Serving</strong>: Serve the blackberry smoothie chilled as a healthy breakfast or a refreshing snack.</li></ul>'),
(15, 'Peanut smoothie', 5, 48, 3, 'assets/imgs/gallary-15.jpg', '<ul><li>Peanut smoothie is a creamy and protein-packed beverage. Here are some details about it:</li><li><strong>Ingredients</strong>: Peanut butter, banana, milk (dairy or plant-based), honey or sweetener (optional), ice cubes (optional).</li><li><strong>Preparation</strong>: Blend peanut butter, banana, milk, honey or sweetener (if desired), and ice cubes (if desired) until smooth. Adjust the consistency and sweetness according to your preference.</li><li><strong>Serving</strong>: Enjoy the peanut smoothie as a satisfying breakfast option or a nutritious snack.</li></ul>'),
(16, 'Cappuccino coffee', 7, 40, 3, 'assets/imgs/gallary-16.jpg', '<p>Cappuccino coffee is a popular espresso-based beverage. Here\'s some information about it:</p><ul><li>Cappuccino is made with equal parts of espresso, steamed milk, and milk foam.</li><li>The espresso is the base of the drink, providing a strong and rich flavor.</li><li>The steamed milk adds a creamy and smooth texture to the cappuccino.</li><li>The milk foam is added on top, creating a frothy layer that adds an extra touch to the presentation.<br>Cappuccinos are often served in a small cup, typically 6 ounces in size.</li><li>The drink can be enjoyed as is or with a sprinkle of cocoa powder or cinnamon on top for added flavor.</li></ul>'),
(17, 'demo', 16, 50, 2, 'assets/imgs/1702160613362.jpg', '<h2>ffffffff</h2>');

-- --------------------------------------------------------

--
-- Table structure for table `general_info_order`
--

CREATE TABLE `general_info_order` (
  `IDOrder` int(11) NOT NULL,
  `IDUser` int(11) NOT NULL,
  `Address` varchar(250) NOT NULL,
  `Date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Payment` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `general_info_order`
--

INSERT INTO `general_info_order` (`IDOrder`, `IDUser`, `Address`, `Date`, `Payment`) VALUES
(1, 1, 'huỳnh văng nghệ', '2023-11-20 12:38:37', 'PayPal'),
(2, 1, 'huỳnh văng nghệ', '2023-11-20 12:38:55', 'Credit card'),
(3, 1, 'Lăng ba vi bộ', '2023-11-20 12:39:24', 'Credit card'),
(4, 1, 'huỳnh văng nghệ', '2023-11-20 12:40:07', 'Credit card'),
(5, 1, '45 Gò vấp', '2023-11-24 13:31:09', 'PayPal'),
(6, 1, 'huỳnh văng nghệ', '2023-11-25 12:51:27', 'PayPal'),
(7, 1, 'huỳnh văng nghệ', '2023-11-25 12:54:18', 'PayPal'),
(8, 1, 'Lăng ba vi bộ', '2023-11-25 12:57:31', 'PayPal'),
(9, 1, 'huỳnh văng nghệ', '2023-11-25 15:12:52', 'PayPal'),
(10, 2, 'huỳnh văng nghệ', '2023-11-26 05:59:01', 'Credit card'),
(11, 2, '45 mai am tiên', '2023-11-26 05:59:17', 'PayPal'),
(12, 1, '470 Trần Đại Nghĩa', '2023-12-01 14:45:06', 'PayPal'),
(13, 1, 'kkkkk', '2023-12-03 22:21:24', 'Credit card'),
(14, 1, '45 mai am tiên', '2023-12-10 04:55:16', 'PayPal'),
(15, 1, '', '2023-12-10 15:37:30', 'Credit card'),
(16, 1, 'sdfsdfsdfdsfsdf', '2023-12-10 15:38:08', 'Credit card'),
(17, 1, '28 huỳnh văn nghệ / ngủ hành sơn', '2023-12-15 07:02:04', 'Credit card'),
(18, 1, 'huỳnh văng nghệ', '2023-12-15 07:14:20', 'Debit card');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `STT` int(11) NOT NULL,
  `IDOrder` int(11) NOT NULL,
  `IDFood` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `state` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`STT`, `IDOrder`, `IDFood`, `Amount`, `Price`, `state`) VALUES
(1, 1, 11, 1, 30, 1),
(2, 2, 4, 4, 10, 1),
(3, 3, 8, 6, 5, 1),
(4, 4, 1, 5, 20, 1),
(5, 4, 4, 3, 10, 1),
(6, 4, 7, 2, 5, 1),
(7, 5, 11, 6, 30, 1),
(8, 6, 1, 1, 2, 1),
(9, 7, 1, 1, 2, 1),
(10, 8, 2, 1, 15, 1),
(11, 8, 12, 1, 25, 1),
(12, 8, 16, 1, 7, 1),
(13, 9, 10, 10, 25, 1),
(14, 10, 13, 4, 15, 1),
(15, 10, 11, 1, 30, 1),
(16, 10, 16, 1, 7, 1),
(17, 11, 8, 1, 5, 1),
(18, 12, 10, 1, 25, 1),
(19, 13, 16, 6, 7, 1),
(20, 13, 7, 1, 5, 1),
(21, 13, 4, 1, 10, 1),
(22, 14, 3, 1, 15, 1),
(23, 15, 6, 1, 10, 1),
(24, 16, 2, 6, 15, 1),
(25, 17, 16, 1, 7, 1),
(26, 18, 7, 6, 5, 1),
(27, 18, 6, 4, 5, 1),
(28, 18, 15, 1, 15, 0);

-- --------------------------------------------------------

--
-- Table structure for table `type_of_food`
--

CREATE TABLE `type_of_food` (
  `IDType` int(11) NOT NULL,
  `Type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `type_of_food`
--

INSERT INTO `type_of_food` (`IDType`, `Type`) VALUES
(2, 'Cake'),
(3, 'Drink'),
(1, 'Main meal'),
(4, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `IDUser` int(11) NOT NULL,
  `User_name` varchar(100) NOT NULL,
  `Mail` varchar(150) NOT NULL,
  `Phone` varchar(10) NOT NULL,
  `Pass` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`IDUser`, `User_name`, `Mail`, `Phone`, `Pass`) VALUES
(1, 'Ánh Ly', 'melpmelp002@gmail.com', '0123456789', 1234),
(2, 'Hoàng Việt', 'HoangViet@gmail.com', '9876543210', 1234),
(3, 'Mai Li', 'Maily@gmail.com', '6549873210', 9874),
(4, 'Gia Bảo', 'BaoNgo@gmail.com', '0147258369', 147258),
(5, 'Linh Phương', 'LinhPg@gmail.com', '0147283695', 1236),
(7, 'Mỹ Linh', 'MyLinhk@gmail.com', '0321649871', 1475),
(11, 'abc', 'abc@gmail.com', '0123654987', 1452),
(13, 'loc loc', 'locloc@gmail.com', '789456123', 7894),
(14, 'Quỳnh Châu', 'ChauQuynh@gmail.com', '0945880566', 1234),
(15, 'Trung Kiên', 'KienDang@gmail.com', '9746123580', 4567),
(16, 'Tất Thành', 'Thanh@gmail.com', '0879561230', 1234),
(17, 'Mèo', 'dangloc2110@gmail.com', '0945880566', 44444);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`STT`),
  ADD KEY `user` (`UserID`),
  ADD KEY `food` (`IDFood`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`idBL`),
  ADD KEY `IDUser` (`IDUser`,`IDFood`),
  ADD KEY `IDFood` (`IDFood`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`IDFood`),
  ADD UNIQUE KEY `food` (`Food`),
  ADD KEY `TypeID` (`TypeID`);

--
-- Indexes for table `general_info_order`
--
ALTER TABLE `general_info_order`
  ADD PRIMARY KEY (`IDOrder`),
  ADD KEY `IDUser` (`IDUser`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`STT`),
  ADD KEY `IDOrder` (`IDOrder`),
  ADD KEY `IDFood` (`IDFood`);

--
-- Indexes for table `type_of_food`
--
ALTER TABLE `type_of_food`
  ADD PRIMARY KEY (`IDType`),
  ADD UNIQUE KEY `Type` (`Type`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`IDUser`),
  ADD UNIQUE KEY `user` (`User_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `STT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `idBL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `IDFood` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `general_info_order`
--
ALTER TABLE `general_info_order`
  MODIFY `IDOrder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `STT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `type_of_food`
--
ALTER TABLE `type_of_food`
  MODIFY `IDType` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `IDUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`IDFood`) REFERENCES `food` (`IDFood`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user_table` (`IDUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user_table` (`IDUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`IDFood`) REFERENCES `food` (`IDFood`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `food_ibfk_1` FOREIGN KEY (`TypeID`) REFERENCES `type_of_food` (`IDType`);

--
-- Constraints for table `general_info_order`
--
ALTER TABLE `general_info_order`
  ADD CONSTRAINT `general_info_order_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user_table` (`IDUser`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`IDOrder`) REFERENCES `general_info_order` (`IDOrder`),
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`IDFood`) REFERENCES `food` (`IDFood`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
