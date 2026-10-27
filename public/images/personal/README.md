Place the three original personal photographs in this directory:

- `hero-gardening.jpeg`: outdoor portrait holding white lilies.
- `indoor-garden.jpg`: indoor plant collection and growing setup.
- `my-cat.jpg`: holding the black cat, including the warning sign.

The homepage shows a neutral placeholder when a file is missing. No substitute
images are used. In development, refresh the page after adding the files. For a
production preview, rebuild with `npm.cmd run build` after adding photographs.

The portrait uses a 4:5 frame with `object-fit: cover` and
`object-position: center 65%`. Check the crop with the original photograph and
adjust that value in `src/app/page.tsx` if necessary. The two interest photos
use matching 4:3 frames with `object-fit: contain` to preserve their entire
composition. The source photographs are never altered.
