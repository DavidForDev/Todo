import { useEffect, useState } from "react";

// ========== Components =========== \\
import Tag from "../taskCard/tag";

// ========== UIelement =========== \\
import { InputDiv } from "./index";

// ========== Icons =========== \\
import LabelIcon from "../../public/icons/label";
import Wrapper from "./wrapper";

// ========== Types =========== \\
import { TagsTypes } from "../../types/type";

const Tags = ({
  label,
  giveValue,
  placeholder,
  requireSign,
  coloration,
  wordsLength,
  limitTag,
  defaultTags,
}: TagsTypes) => {
  const [tags, setTags] = useState<Array<Object>>([]);
  const [tagColors, setTagColors] = useState<Array<String>>([
    "#FD71AF",
    "#00B884",
    "#5577FF",
    "#48929b",
    "#8794ca",
  ]);
  const [inputValue, setInputValue] = useState<string>("");

  // ========= give tags to parent component
  useEffect(() => {
    giveValue(tags);
  }, [tags, giveValue]);

  useEffect(() => {
    if (!defaultTags || defaultTags.length === 0) return;

    setTags(defaultTags);
  }, [defaultTags]);

  // ================== get Random color of tag ================== \\
  const randomColorTag = (max: number) => {
    if (!coloration) return null;

    const randomNumber = Math.floor(Math.random() * max);
    const color = tagColors[randomNumber];

    // remove the current color to avoid the same color next time
    const removeCurrentColor = tagColors.filter((x: any) => x !== color);
    setTagColors(removeCurrentColor);

    return color;
  };

  // ================== Add Tag Function ================== \\
  const addTag = (input: any) => {
    if (input.keyCode !== 32 && input.keyCode !== 13) return;

    // tag value
    const value = input.target.value;

    if (!value.trim()) return;

    // randomed color
    const color = randomColorTag(tagColors.length) || "#00B884";
    const newTag = coloration ? { name: value, color: color } : { name: value };

    setTags([...tags, newTag]);

    setInputValue("");
  };

  // ================== Limit Tags ================== \\
  const limitTags = (limit: number) => {
    return tags.length < limit ? false : true;
  };

  // ================== helps to clear input after adding tag ================== \\
  const toClearValue = (e: any) => {
    setInputValue(e.target.value);
  };

  // ================== remove Tag && return the used color ================== \\
  const removeFunction = (arg: String) => {
    if (!arg) return null;

    // return color
    if (coloration) {
      const returnColor: any = tags.find((x: any) => x.name === arg);
      setTagColors([...tagColors, returnColor.color]);
    }

    // remove tag
    const removeTag = tags.filter((x: any) => x.name !== arg);
    setTags(removeTag);
  };

  return (
    <Wrapper label={label} requireSign={requireSign}>
      <InputDiv color="white" className="shadow-sm flex items-center gap-2">
        <LabelIcon />
        <input
          type="text"
          disabled={limitTags(limitTag ? limitTag : 3)}
          placeholder={placeholder ? placeholder : "Add Tags"}
          value={inputValue}
          onChange={toClearValue}
          onKeyDown={addTag}
          className="w-full text-sm"
          maxLength={wordsLength ? wordsLength : 15}
        />
      </InputDiv>
      <div className="flex items-center gap-2 flex-wrap w-full overflow-auto max-h-28">
        {tags.map((detail: any, index: number) => {
          return (
            <Tag
              detail={detail}
              removeFunction={() => removeFunction(detail.name)}
              key={index}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Tags;
