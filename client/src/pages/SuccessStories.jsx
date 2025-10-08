import React from 'react'
import { Box, Grid, Card, CardContent, CardMedia, Typography, Container, useMediaQuery } from '@mui/material'

const SuccessStories = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  
  const patients = [
    {
      name: "Jugulkar sir",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/O5fJwqHRSR4",
      story: "Recovered fully after successful cardiac surgery."
    },
    {
      name: "Mahesh Madane",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Aditya Mali",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Successfully treated for heart issues."
    },
    {
      name: "Krishna Pawar",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/O5fJwqHRSR4",
      story: "Recovered fully after successful cardiac surgery."
    },
    {
      name: "Malme sir",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Avishkar Madne",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Successfully treated for heart issues."
    }
    ,
    {
      name: "Ashwini",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    
    {
      name: "Kashibai",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Pramod Kamble ",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Pooja Divte",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Priyanka Guled",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Sunita Gaikwad",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Swati kokate",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Pooja Shinde",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Shivajirao Barge",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Kusum Lad",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Abhijeet Shinde",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Vilas Tomke",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Dholu Bhujar",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Mohan Buchade",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Savita Mali",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Rupsing Rathod",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Shivajirao",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Rohit Mane",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Pramod",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Nivruth Shinde",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Gopinath",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Shivaji Kadam",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Amika Jadhav",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Tejashri",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Kalyani Khade",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Bajrang Kadam",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Shobha More",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Promd Kamble",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Appasoo Pudale",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Pratiksha",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Pallavi Barge",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Bhagyashri",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Vashinavi",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Rajesh Mudkal",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Pushpalata",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Nandkumar",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Sunita Mane",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Vinayak",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Hanmant",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Vijaya Mali",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Kumar Kamble",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
    {
      name: "Gargi Rade",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Asha Sawant",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Dr. Smitha Rade",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Suresh Gaikwad",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Sandip Shinde",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Vimal Jadhav",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Manda Divte",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Ajit",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Vinay chavan",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Abhijeet Shinde",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Prashak Jadhav",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Vaishali Jadhav",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Anita Dongare",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Paridhi Singh",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Shila Singh",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Kiran Choudhary",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Mughda Sawant",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Vidya Sawant",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Nilesh Patil",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Chabuatai Patil",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Mangit Singh",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Apparna Vetal",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Sakshi Mali",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Shahaji Dhumke ",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Rohit Mane",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Mokale",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Vidya Shinde",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Vasant Jadhav",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Sindhu Yadaav",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Dipak Mane",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Shivshankar Golsare",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Dipali Golsare",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Vijaya Padole",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Raj Kumbhar",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Sunita Jadhav",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Shailaja Jadhav",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Baddu Naik",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Prabhavati",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Arjun Nalage",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Subhash Mali",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Reshma ",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Advay Golsare",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Jagdish Pindi",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Vimal Sutar",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Rohit Kapase",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Arnika Jadhav",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Aishwarya",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Shourya Pawar",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Varsha Mali",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Poonam Pawar",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Nitin Gavade",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Mangit Singh",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Kusum Nikam",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Mangal Kadam",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Kalyani Khade",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Sandesh Patil",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Mangal Chavan",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Surayakan Chavan",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Pihu Patel",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
     {
      name: "Jyoti Patel",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
      video: "https://www.youtube.com/embed/K9HV_snrOwE",
      story: "Treatment helped him regain mobility and health."
    },
  ]

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #e3f2fd, #e0f7fa)',
      py: { xs: 3, sm: 4 }
    }}>
      <Container maxWidth="xl">
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          gutterBottom 
          textAlign="center"
          sx={{ 
            mb: { xs: 3, sm: 4 },
            fontWeight: 700,
            color: 'primary.main',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Our Cured Patients
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {patients.map((patient, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <Card sx={{ 
                maxWidth: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                }
              }}>
                <CardMedia
                  component="img"
                  height={isMobile ? "180" : "200"}
                  image={patient.photo}
                  alt={patient.name}
                  sx={{
                    objectFit: 'cover',
                    borderRadius: '12px 12px 0 0'
                  }}
                />
                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  p: { xs: 2, sm: 2.5 }
                }}>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    sx={{ 
                      mb: 1,
                      fontWeight: 600,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                  >
                    {patient.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                      lineHeight: 1.5,
                      flexGrow: 1
                    }}
                  >
                    {patient.story}
                  </Typography>
                  {patient.video && (
                    <Box sx={{ 
                      position: 'relative', 
                      pb: '56.25%', 
                      height: 0,
                      borderRadius: 2,
                      overflow: 'hidden',
                      mt: 'auto'
                    }}>
                      <iframe
                        src={patient.video}
                        title={patient.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          borderRadius: '8px'
                        }}
                      ></iframe>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default SuccessStories
