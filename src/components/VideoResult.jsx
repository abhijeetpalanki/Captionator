import { useEffect, useRef, useState } from "react";
import SparklesIcon from "./SparklesIcon";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { transcriptionItemsToSrt } from "@/libs/awsTranscriptionHelpers";
import roboto from "@/fonts/Roboto-Regular.ttf";
import robotoBold from "@/fonts/Roboto-Bold.ttf";

export default function VideoResult({ filename, transcriptionItems }) {
  const videoUrl = "https://ayp-captionator.s3.amazonaws.com/" + filename;
  const [loaded, setLoaded] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#ffffff");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [progress, setProgress] = useState(1);

  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.src = videoUrl;
    load();
  }, []);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    await ffmpeg.writeFile("/tmp/roboto.ttf", await fetchFile(roboto));
    await ffmpeg.writeFile("/tmp/roboto-bold.ttf", await fetchFile(robotoBold));
    setLoaded(true);
  };

  function rgbToASCII(rgb) {
    const bgr = rgb.slice(5, 7) + rgb.slice(3, 5) + rgb.slice(1, 3);
    return "&H" + bgr;
  }

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    const srt = transcriptionItemsToSrt(transcriptionItems);
    await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
    await ffmpeg.writeFile("subs.srt", srt);

    videoRef.current.src = videoUrl;
    await new Promise((resolve, reject) => {
      videoRef.current.onloadedmetadata = resolve;
    });
    const duration = videoRef.current.duration;

    ffmpeg.on("log", (message) => {
      const regexResult = /time=([0-9:.]+)/.exec(message.message);
      if (regexResult && regexResult?.[1]) {
        const howMuchIsDone = regexResult?.[1];
        const [hours, minutes, seconds] = howMuchIsDone.split(":");
        const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
        const videoProgress = doneTotalSeconds / duration;
        setProgress(videoProgress);
      }
    });

    await ffmpeg.exec([
      "-i",
      filename,
      "-preset",
      "ultrafast",
      "-vf",
      `subtitles=subs.srt:fontsdir=/tmp:force_style='FontName=Roboto Bold,Fontsize=30,PrimaryColour=${rgbToASCII(
        primaryColor
      )},OutlineColour=${rgbToASCII(outlineColor)},MarginV=40'`,
      "output.mp4",
    ]);
    const data = await ffmpeg.readFile("output.mp4");
    videoRef.current.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    setProgress(1);
  };

  return (
    <>
      <div className="mb-4">
        <button
          onClick={transcode}
          className="inline-flex gap-2 px-6 py-2 bg-green-600 border-2 rounded-full cursor-pointer border-purple-700/50"
        >
          <SparklesIcon />
          <span>Apply Captions</span>
        </button>
      </div>
      <div>
        primary color:
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
        <br />
        outline color:
        <input
          type="color"
          value={outlineColor}
          onChange={(e) => setOutlineColor(e.target.value)}
        />
      </div>
      <div className="relative overflow-hidden rounded-xl">
        {progress && progress < 1 && (
          <div className="absolute inset-0 flex items-center bg-black/80">
            <div className="w-full text-center">
              <div className="relative mx-8 overflow-hidden rounded-lg bg-bgGradientFrom/50">
                <div
                  className="h-8 bg-bgGradientFrom"
                  style={{ width: progress * 100 + "%" }}
                >
                  <h3 className="absolute inset-0 py-1 text-3xl text-white">
                    {parseInt(progress * 100)}%
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
        <video ref={videoRef} controls data-video={0}></video>
      </div>
    </>
  );
}
