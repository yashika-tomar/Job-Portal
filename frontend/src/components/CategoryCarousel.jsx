import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Data Analyst",
    "Data Engineer",
    "IOT Developer",
    "Cloud Engineer",
    "Data Scientist",
    "UI/UX Designer",
    "DevOps Engineer",
    "Graphic Designer",
    "Machine Learning",
    "Backend Developer",
    "Robotics Engineer",
    "Frontend Developer",
    "Penetration Tester",
    "Framework Engineer",
    "Mobile App Developer",
    "MERN Stack Developer",
    "Network Administrator",
    "Database Administrator",
    "Cybersecurity Engineer",
    "Artificial Intelligence",
    "Java Fullstack Developer",
    "Test Automation Specialist"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div className="max-w-4xl mx-auto my-20">
            <Carousel className="w-full">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className='basis-1/2 sm:basis-1/3 lg:basis-1/4'>
                                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="w-full rounded-full text-xs sm:text-sm">
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel;
