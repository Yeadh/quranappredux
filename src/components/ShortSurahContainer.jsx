import ShortSurah from "./ShortSurah";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import { useRef } from "react";
import { useSelector } from "react-redux";

const ShortSurahContainer = ({
  currentSurahNumber,
  setCurrentSurahNumber,
  toggleSidebar,
}) => {
  const { shortSurahList } = useSelector((state) => state.shortSurah);
  const leftSideRef = useRef(null);
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );
  return (
    <div className="space-y-2 w-full h-[100%]">
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={leftSideRef}
            width={width}
            height={height}
            rowHeight={cache.current.rowHeight}
            deferredMeasurementCache={cache.current}
            rowCount={114}
            scrollToIndex={currentSurahNumber - 1}
            rowRenderer={({ key, index, style, parent }) => {
              const surah = shortSurahList[index];
              return (
                <CellMeasurer
                  key={key}
                  cache={cache.current}
                  parent={parent}
                  columnIndex={0}
                  rowIndex={index}
                >
                  <div
                    style={{ ...style, paddingBottom: "7px" }}
                    id={`short-surah-${surah.id}`}
                  >
                    <ShortSurah
                      surah={surah}
                      currentSurahNumber={currentSurahNumber}
                      setCurrentSurahNumber={setCurrentSurahNumber}
                      toggleSidebar={toggleSidebar}
                    />
                  </div>
                </CellMeasurer>
              );
            }}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default ShortSurahContainer;
