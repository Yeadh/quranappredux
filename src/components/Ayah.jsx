/* eslint-disable eqeqeq */
import convertToBanglaNumber from "engnumber-to-banglanumber";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRef } from "react";
import Alert from "@mui/material/Alert";
import useAudioPlayer from "../hooks/useAudioPlay";
import { useSelector } from "react-redux";

const RenderHtml = ({ htmlString }) => {
  return (
    <span
      className="text-right"
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};

const Ayah = ({
  ayah,
  surahNumber,
  ayahRef,
  lastReadedAyah,
  arabicTextSize,
  banglaTextSize,
  englishTextSize,
  handleTafsirModal,
  saveToReadLater,
}) => {
  const { readLater } = useSelector((state) => state.nobleQuran);
  const {
    id,
    colorText,
    english_text,
    bangl_text,
    page,
    is_sajdah_ayat,
    audio,
    ruku,
    juz,
    manzil,
  } = ayah;
  const tooltipRef = useRef(null);

  function toggleTooltip() {
    if (tooltipRef.current.classList.contains("scale-0")) {
      tooltipRef.current.classList.remove("scale-0");
      tooltipRef.current.classList.add("scale-1");

      const currentTooltipValue = tooltipRef.current.getAttribute("data-value");
      const scale1 = document.getElementsByClassName("scale-1");
      if (scale1.length > 0) {
        for (let i = 0; i < scale1.length; i++) {
          if (currentTooltipValue !== scale1[i].getAttribute("data-value")) {
            scale1[i].classList.add("scale-0");
            scale1[i].classList.remove("scale-1");
          }
        }
      }
    } else {
      tooltipRef.current.classList.remove("scale-1");
      tooltipRef.current.classList.add("scale-0");
    }
  }
  const { audioRef, isLoading, isPlaying, audioUrlHandler, setIsPlaying } =
    useAudioPlayer();

  return (
    <>
      <div
        className={`bgColor2 hoverBg p-4 text-justify rounded-md`}
        id={`ayat${id}`}
        ref={lastReadedAyah == id ? ayahRef : null}
      >
        <Box
          component="div"
          className={`flex items-center ${
            readLater && readLater[surahNumber] == id
              ? "justify-between"
              : "justify-center"
          } mb-2 h-[45px]`}
        >
          <div className="flex gap-1 lg:gap-3 items-center lg:justify-center text-center txtColor flex-wrap lg:flex-nowrap">
            <Box component="span" className="">
              <Tooltip
                TransitionComponent={Zoom}
                title={`Page - ${page}`}
                arrow={true}
                placement="top"
                classes={{
                  tooltip: "darkBgColor1",
                  tooltipArrow: "darkBgColor1",
                }}
              >
                <Button
                  variant="outlined"
                  classes={{
                    root: "txtColor !pt-1 !border-slate-400",
                    outlined: "!capitalize !font-normal !cursor-default",
                  }}
                  size="small"
                >
                  {`পৃষ্ঠা - ${convertToBanglaNumber(page.toString())}`}
                </Button>
              </Tooltip>
            </Box>
            <Box component="span" className="">
              <Tooltip
                TransitionComponent={Zoom}
                title={`Juz - ${juz}`}
                arrow={true}
                placement="top"
                classes={{
                  tooltip: "darkBgColor1",
                  tooltipArrow: "darkBgColor1",
                }}
              >
                <Button
                  variant="outlined"
                  classes={{
                    root: "txtColor !pt-1 !border-slate-400",
                    outlined: "!capitalize !font-normal !cursor-default",
                  }}
                  size="small"
                >
                  {`পারা - ${convertToBanglaNumber(juz.toString())}`}
                </Button>
              </Tooltip>
            </Box>
            <Box component="span" className="">
              <Tooltip
                TransitionComponent={Zoom}
                title={`Ruku - ${ruku}`}
                arrow={true}
                placement="top"
                classes={{
                  tooltip: "darkBgColor1",
                  tooltipArrow: "darkBgColor1",
                }}
              >
                <Button
                  variant="outlined"
                  classes={{
                    root: "txtColor !pt-1 !border-slate-400",
                    outlined: "!capitalize !font-normal !cursor-default",
                  }}
                  size="small"
                >
                  {`রুকু - ${convertToBanglaNumber(juz.toString())}`}
                </Button>
              </Tooltip>
            </Box>
            <Box component="span" className="">
              <Tooltip
                TransitionComponent={Zoom}
                title={`Manzil - ${manzil}`}
                arrow={true}
                placement="top"
                classes={{
                  tooltip: "darkBgColor1",
                  tooltipArrow: "darkBgColor1",
                }}
              >
                <Button
                  variant="outlined"
                  classes={{
                    root: "txtColor !pt-1 !border-slate-400",
                    outlined: "!capitalize !font-normal !cursor-default",
                  }}
                  size="small"
                >
                  {`মঞ্জিল - ${convertToBanglaNumber(juz.toString())}`}
                </Button>
              </Tooltip>
            </Box>
          </div>
          {readLater && readLater[surahNumber] == id && (
            <Alert
              severity="success"
              className="bgSuccess"
              sx={{
                fontSize: 10,
                padding: "0px 10px",
                display: "flex",
                alignItems: "center",
              }}
              classes={{
                message: "text-xs ml-[-5px]",
              }}
            >
              Saved Ayah
            </Alert>
          )}
        </Box>

        {is_sajdah_ayat && (
          <Alert severity="warning" className="bgWarning my-1 mt-3 enTxt">
            This is Sejdah Ayah ( এটা সিজদাহ আয়াত )
          </Alert>
        )}

        <Box
          component="p"
          className="txtColor arabic flex items-center justify-between py-3 divider"
        >
          <span
            className="arabicTxt text-right w-full mt-1"
            style={{
              fontSize: `${arabicTextSize}px`,
            }}
          >
            <RenderHtml htmlString={colorText} />
          </span>
        </Box>
        <Box
          component="p"
          className="txtColor text-left bangla py-3 divider bnTxt"
          style={{
            fontSize: `${banglaTextSize}px`,
          }}
        >
          {bangl_text}
          <span className="px-1 mx-2 border-2 border-slate-400 rounded-full">
            {convertToBanglaNumber(id.toString())}
          </span>
        </Box>
        <Box
          component="p"
          className="txtColor text-left text-lg english py-3 divider enTxt"
          style={{
            fontSize: `${englishTextSize}px`,
            lineHeight: `${
              englishTextSize > 24 ? `${englishTextSize}px` : "auto"
            }`,
          }}
        >
          {english_text}
          <span className="px-1 mx-2 border-2 border-slate-400 rounded-full">
            {id}
          </span>
        </Box>

        <Box component="div" className="mt-2">
          <div className="flex items-center txtColor ter justify-between">
            <audio ref={audioRef}></audio>
            <div className="w-[50px] h-[50px] flex items-center justify-center">
              {!isPlaying && !isLoading && (
                <div className="button">
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Play The Ayah"
                    arrow={true}
                    placement="right"
                    classes={{
                      tooltip: "darkBgColor1",
                      tooltipArrow: "darkBgColor1",
                    }}
                  >
                    <IconButton
                      aria-label="play"
                      size="large"
                      onClick={() => {
                        audioUrlHandler(audio);
                      }}
                    >
                      <PlayArrow fontSize="inherit" className="txtColor" />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              {isPlaying && !isLoading && (
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Pause The Ayah"
                  arrow={true}
                  placement="right"
                  classes={{
                    tooltip: "darkBgColor1",
                    tooltipArrow: "darkBgColor1",
                  }}
                >
                  <div
                    className="wave-container cursor-pointer h-full"
                    onClick={() => setIsPlaying(false)}
                  >
                    <div className="wave-animation flex items-center gap-1 w-full h-full cursor-pointer">
                      <div
                        className="wave-pillar w-[2px] h-[12px] waveBg rounded-sm"
                        onClick={() => setIsPlaying(false)}
                      ></div>
                      <div
                        className="wave-pillar w-[2px] h-[12px] waveBg rounded-sm"
                        onClick={() => setIsPlaying(false)}
                      ></div>
                      <div
                        className="wave-pillar w-[2px] h-[12px] waveBg rounded-sm"
                        onClick={() => setIsPlaying(false)}
                      ></div>
                      <div
                        className="wave-pillar w-[2px] h-[12px] waveBg rounded-sm"
                        onClick={() => setIsPlaying(false)}
                      ></div>
                      <div
                        className="wave-pillar w-[2px] h-[12px] waveBg rounded-sm"
                        onClick={() => setIsPlaying(false)}
                      ></div>
                      <div
                        className="wave-pillar w-[2px] h-[12px] waveBg rounded-sm"
                        onClick={() => setIsPlaying(false)}
                      ></div>
                    </div>
                  </div>
                </Tooltip>
              )}
              {isLoading && (
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Loading..."
                  arrow={true}
                  placement="right"
                  classes={{
                    tooltip: "darkBgColor1",
                    tooltipArrow: "darkBgColor1",
                  }}
                >
                  <CircularProgress
                    classes={{
                      circle: "txtColor",
                    }}
                    size="2rem"
                  />
                </Tooltip>
              )}
            </div>
            <div className="">
              <Button
                size="small"
                variant="contained"
                classes={{
                  root: "bgColor1 txtColor hoverBg !pt-2",
                }}
                onClick={() => handleTafsirModal(surahNumber, id)}
              >
                তাফসীর ইবনে কাছীর
              </Button>
            </div>
            <div className="relative">
              <IconButton
                aria-label="more"
                size="large"
                onClick={toggleTooltip}
              >
                <MoreVertIcon fontSize="inherit" className="txtColor" />
              </IconButton>
              <div
                ref={tooltipRef}
                className="z-[1600] transition-all absolute top-2 right-14 scale-0 origin-right"
                data-value={id}
                onClick={() => {
                  toggleTooltip();
                  saveToReadLater(surahNumber, id);
                }}
              >
                <div className="bgColor3 rounded-md cursor-pointer relative">
                  <Box
                    component="div"
                    className="flex gap-1 w-full py-2 px-2 text-sm"
                  >
                    {readLater && readLater[surahNumber] == id ? (
                      <>
                        <span>Remove</span>
                        <span>From</span>
                        <span>Read</span>
                        <span>Later</span>
                      </>
                    ) : (
                      <>
                        <span>Save</span>
                        <span>To</span>
                        <span>Read</span>
                        <span>Later</span>
                      </>
                    )}
                  </Box>
                  <div className="bgColor3 p-1.5 absolute top-3 right-[-5px] rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

export default Ayah;
