import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const LibraryIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth || 1.5}
      d="M2 7c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.9 3 4.6 3 6 3c1.4 0 2.1 0 2.635.272a2.5 2.5 0 0 1 1.093 1.093C10 4.9 10 5.6 10 7v10c0 1.4 0 2.1-.272 2.635a2.5 2.5 0 0 1-1.093 1.092C8.1 21 7.4 21 6 21c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C2 19.1 2 18.4 2 17V7ZM6 17h.009M2 7h8M11.449 8.268c-.355-1.33-.533-1.995-.41-2.572a2.46 2.46 0 0 1 .756-1.316c.437-.395 1.1-.573 2.424-.93 1.324-.356 1.987-.534 2.561-.411.506.108.965.374 1.31.76.394.438.572 1.103.927 2.433l2.534 9.5c.355 1.33.533 1.995.41 2.572a2.46 2.46 0 0 1-.756 1.316c-.437.395-1.1.573-2.424.93-1.324.356-1.986.534-2.561.411a2.447 2.447 0 0 1-1.31-.76c-.394-.438-.572-1.103-.927-2.433l-2.534-9.5ZM17.781 16.695l.009-.002M12 8l6.5-2"
    />
  </Svg>
);

const UploadBookIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={props.strokeWidth || 1.5}
      d="M21 16.929V10c0-3.771 0-5.657-1.172-6.828C18.657 2 16.771 2 13 2h-1C8.229 2 6.343 2 5.172 3.172 4 4.343 4 6.229 4 10v9.5"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth || 1.5}
      d="m9.5 8.673 1.409-1.486C11.659 6.396 12.034 6 12.5 6c.466 0 .841.396 1.591 1.187L15.5 8.673m-3-2.586V13"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={props.strokeWidth || 1.5}
      d="M21 17H6.5a2.5 2.5 0 0 0 0 5H21"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={props.strokeWidth || 1.5}
      d="M21 17a2.5 2.5 0 0 0 0 5"
    />
  </Svg>
);

const BookmarkIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth || 1.5}
      d="M4 17.98V9.709c0-3.634 0-5.45 1.172-6.58C6.343 2 8.229 2 12 2c3.771 0 5.657 0 6.828 1.129C20 4.257 20 6.074 20 9.708v8.273c0 2.306 0 3.459-.773 3.871-1.497.8-4.304-1.867-5.637-2.67-.773-.465-1.16-.698-1.59-.698-.43 0-.817.233-1.59.698-1.333.803-4.14 3.47-5.637 2.67C4 21.44 4 20.287 4 17.981Z"
    />
  </Svg>
);

const SettingsIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={props.strokeWidth || 1.5}
      d="m21.817 7.141-.493-.856c-.373-.648-.56-.972-.878-1.101-.317-.13-.676-.027-1.395.176l-1.22.344c-.459.106-.94.046-1.358-.17l-.337-.194a2 2 0 0 1-.788-.967l-.334-.998c-.22-.66-.33-.99-.591-1.178-.261-.19-.609-.19-1.303-.19h-1.115c-.694 0-1.041 0-1.303.19-.261.188-.37.518-.59 1.178l-.334.998a2 2 0 0 1-.789.967l-.337.195c-.418.215-.9.275-1.358.17l-1.22-.345c-.719-.203-1.078-.305-1.395-.176-.318.129-.505.453-.878 1.1l-.493.857c-.35.608-.525.911-.491 1.234.034.324.268.584.736 1.105l1.031 1.153c.252.319.431.875.431 1.375s-.179 1.056-.43 1.375l-1.032 1.152c-.468.521-.702.782-.736 1.105-.034.323.14.627.49 1.234l.494.857c.373.647.56.971.878 1.1.317.13.676.028 1.395-.176l1.22-.344c.459-.105.94-.045 1.359.17l.336.194c.36.23.636.57.788.968l.335.997c.22.66.329.99.59 1.18.262.188.609.188 1.303.188h1.115c.694 0 1.042 0 1.303-.189.261-.189.371-.519.59-1.179l.335-.997c.152-.399.428-.738.788-.968l.336-.194c.42-.215.9-.276 1.36-.17l1.22.344c.718.204 1.077.306 1.394.177.318-.13.505-.454.878-1.101l.493-.857c.35-.607.525-.91.491-1.234-.034-.323-.268-.584-.736-1.105l-1.031-1.152c-.252-.32-.431-.875-.431-1.375s.179-1.056.43-1.375l1.032-1.153c.468-.52.702-.781.736-1.105.034-.323-.14-.626-.49-1.234Z"
    />
    <Path
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1.5}
      d="M16.02 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
    />
  </Svg>
);

const UploadSquare = (props: SvgProps) => (
  <Svg
    width={49}
    height={48}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M24.5 16v16m0-16c-1.4 0-4.017 3.989-5 5m5-5c1.4 0 4.017 3.989 5 5"
    />
    <Path
      stroke="currentColor"
      strokeWidth={3}
      d="M5.5 24c0-8.957 0-13.435 2.782-16.218C11.065 5 15.543 5 24.5 5s13.435 0 16.218 2.782C43.5 10.565 43.5 15.043 43.5 24s0 13.435-2.782 16.218C37.935 43 33.457 43 24.5 43s-13.435 0-16.218-2.782C5.5 37.435 5.5 32.957 5.5 24Z"
    />
  </Svg>
);

const EyeOpen = (props: SvgProps) => (
  <Svg
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M21.544 11.125c.304.426.456.64.456.955 0 .316-.152.529-.456.955-1.366 1.916-4.855 6.045-9.544 6.045-4.69 0-8.178-4.13-9.544-6.045-.304-.426-.456-.64-.456-.955 0-.316.152-.529.456-.955C3.822 9.209 7.311 5.08 12 5.08c4.69 0 8.178 4.13 9.544 6.045Z"
    />
    <Path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M15 12.08a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z"
    />
</Svg>
);

const ChevronRight = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 4s4 2.946 4 4c0 1.054-4 4-4 4"
    />
  </Svg>
);

export {
  LibraryIcon,
  UploadBookIcon,
  BookmarkIcon,
  SettingsIcon,
  UploadSquare,
  EyeOpen,
  ChevronRight,
};
