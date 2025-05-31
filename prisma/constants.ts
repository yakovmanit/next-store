import {hashSync} from "bcrypt";
import {UserRole} from ".prisma/client";

export const users = [
  {
    id: 1,
    fullName: 'User 1',
    email: 'text1@gmail.com',
    password: hashSync('11111', 10),
    verified: new Date(),
    role: UserRole.USER,
  },
  {
    id: 2,
    fullName: 'Admin 1',
    email: 'text2@gmail.com',
    password: hashSync('11111', 10),
    verified: new Date(),
    role: UserRole.ADMIN,
  },
]

export const categories = [
  { id: 1, name: 'Coffee blend' },
  { id: 2, name: 'Coffee monosort' },
  { id: 3, name: 'Drips' },
  { id: 4, name: 'Sets' },
]

export const ingredients = [
  {
    id: 1,
    name: 'Drip Ethiopia Chelbesa',
    price: 40,
    imageUrl : 'https://foundation-images.fra1.cdn.digitaloceanspaces.com/pl/uploads/goods/yGfygOR9vr2Be8y5A9N3xNKskJRqEaj6pOJomxpZ.png',
  },
  {
    id: 2,
    name: 'Drip monteblanco',
    price: 50,
    imageUrl : 'https://foundation-images.fra1.cdn.digitaloceanspaces.com/pl/uploads/goods/kaHlxJL1iHroYKcti0hlIt33Q7YqqDL8DG13rMif.png',
  },
  {
    id: 3,
    name: 'Drip La Luisa',
    price: 60,
    imageUrl : 'https://image.maudau.com.ua/webp/size/lg/products/f9/37/7c/f9377c27-cfe4-4126-9b27-abf8da47f0f9',
  },
  {
    id: 4,
    name: 'Drip Ethiopia Chelbesa 2',
    price: 40,
    imageUrl : 'https://foundation-images.fra1.cdn.digitaloceanspaces.com/pl/uploads/goods/yGfygOR9vr2Be8y5A9N3xNKskJRqEaj6pOJomxpZ.png',
  },
  {
    id: 5,
    name: 'Drip monteblanco 2',
    price: 50,
    imageUrl : 'https://foundation-images.fra1.cdn.digitaloceanspaces.com/pl/uploads/goods/kaHlxJL1iHroYKcti0hlIt33Q7YqqDL8DG13rMif.png',
  },
  {
    id: 6,
    name: 'Drip La Luisa 2',
    price: 60,
    imageUrl : 'https://image.maudau.com.ua/webp/size/lg/products/f9/37/7c/f9377c27-cfe4-4126-9b27-abf8da47f0f9',
  },
];

export const products = [
  {
    id: 1,
    name: 'April Nero Blend',
    imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3BiJcJYemwOvf8pqscrulgbi_j9WicFTIgA&s',
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Summer Monosort',
    imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpMXQlp22lNrMOVRz3MX_i_TAAk_A_fQEhKA&s',
    categoryId: 2,
  },
  {
    id: 3,
    name: 'La Luisa Drips',
    imageUrl : 'https://image.maudau.com.ua/webp/size/lg/products/f9/37/7c/f9377c27-cfe4-4126-9b27-abf8da47f0f9',
    categoryId: 3,
  },
];