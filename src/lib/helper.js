function cartesianDistace(p1, p2) {
    return ((p1.x - p2.x)**2 + (p1.y - p2.y)**2)**(1/2);
}

function contains(min, max, point) {
    return (min <= point.x && point.x <= max 
        && min <= point.y && point.y <= max)
}

export {cartesianDistace, contains}