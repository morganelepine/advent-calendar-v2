export interface Content {
    id: number;
    dayNumber: number;
    type: string;
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    content5: string;
    listOfContents?: ListOfContents[];
}

export interface ListOfContents {
    title: string;
    url: string;
    description?: string;
}
