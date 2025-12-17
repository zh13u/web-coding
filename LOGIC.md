# PhoneStore logic (tom tat khong dau)

## Cong nghe
- Next.js (app router) + React. Khong co backend, tat ca du lieu tam luu o localStorage.
- UI dung cac component Header/Footer, ProductCard, ProductDetail, CartItem, WishlistButton, Alert/Loading...
- Data san pham lay tu `src/data/products.ts`.

## Luong chinh theo trang
- Trang chu `/`: hien 4 san pham demo tu `products`, nut Them vao gio hang chi tang state demo (khong ghi localStorage).
- Danh sach san pham `/products` (`src/app/products/page.tsx`): doc PRODUCTS tu data, bo loc theo search, brand, khoang gia, sap xep theo tieu chi. Nut Them vao gio hang ghi truc tiep vao localStorage voi variant mac dinh.
- Chi tiet san pham `/products/[id]`: tim san pham theo id; neu khong co thi hien thong bao. Tao danh sach variants mau/bo nho ngay trong file. Them vao gio hang se ghi localStorage (gom variant text + quantity). Mua ngay = them vao gio + push sang `/checkout`.
- Wishlist `/wishlist`: doc/ghi danh sach wishlist trong localStorage. Xoa item hoac chuyen item sang gio hang (neu da co thi tang quantity).
- Gio hang `/cart`: doc/ghi cart tu localStorage qua hook `useLocalStorage`. Cap nhat quantity (1-10), xoa item, clear cart. Nut Thanh toan se chan neu gio rong, neu co thi di `/checkout`.
- Checkout `/checkout`: neu gio rong -> redirect ve `/cart`. Validate form co ban. Submit se gia lap API: tao orderNumber, luu order vao localStorage (`orders`), clear cart, hien man hinh thanh cong. Ho tro ma giam gia PHONE10 (10%) va SALE50K (toi da 50k). Tinh total = subtotal + shipping (free neu >=2tr) - discount.
- Don hang `/orders`: bat user dang nhap (doc `currentUser` tu localStorage), neu khong co thi push ve home. Loc danh sach don theo email user, bo loc status, cho phep huy don (cap nhat localStorage).
- Header (`src/components/Header.tsx`): doc currentUser tu localStorage, tinh badge gio/wishlist tu localStorage (listen event `storage`). Search se push URL `/products?q=...`. Giu modal login/register, doi mat khau gia lap.
- Auth (`src/components/AuthModal.tsx`): login/register su dung localStorage `users` + `currentUser` (khong goi API).
- Hook `useLocalStorage` (`src/hooks/useLocalStorage.ts`): bo tro state + set/remove vao localStorage, duoc dung cho cart, wishlist, user, orders.

## Du lieu
- `src/data/products.ts`: mang Product (id, name, description, price, oldPrice?, image, brand, badge). Duoc render o trang chu, danh sach, chi tiet.

## Trang noi dung
- `src/app/policy/...` (returns, warranty, shipping-payment, purchase-guide) la trang tĩnh, khong co logic phuc tap, chi render noi dung chinh sach.

## Cach luu tru localStorage chinh
- `cart`: {id, name, price, quantity, variant, image}
- `wishlist`: {id, name, price, image, addedAt}
- `users`: danh sach user da dang ky; `currentUser`: user dang dang nhap
- `orders`: danh sach don da dat (chi giao dien gia lap)

## Chu y khi giai thich
- Tat ca logic mang tinh demo, khong co API va khong co auth that.
- Mua hang/checkout/huy don chi la thao tac voi localStorage va UI. Hanh vi server thuc te can thay bang API.
