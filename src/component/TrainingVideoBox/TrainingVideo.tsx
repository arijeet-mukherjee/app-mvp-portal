'use client'
import CardBox from "@/component/common/cardBox";
import { makeWebServiceCall } from "@util/index";
import { useEffect, useState } from "react";
import data from '../../data/EN.json';


const TrainingVideoBox = () => {
    const [videos, setVideos] = useState<any>([]);
    useEffect(() => {
        async function fetchMyAPI() {
            const data = await makeWebServiceCall("https://634facc278563c1d82ac7346.mockapi.io/anime", "get", "");
            setVideos(data);
        }
        fetchMyAPI();
    }, [])

    return (
        <div className="">
            {videos.map((video: any) => {
                return (
                    <div key={video.id}>
                        <CardBox
                            title={video.title}
                            description={video.description}
                            background={data.introduction.background}
                            videoThumbnail={video.anime}
                            iconPosition="left"
                            paddingLeftContent={data.introduction.paddingLeftContent}
                            paddingImageContent={data.introduction.paddingImageContent}
                            createdAt={video.createdAt}
                        />
                    </div>
                )
            })}
        </div>

    );
};

export default TrainingVideoBox;
