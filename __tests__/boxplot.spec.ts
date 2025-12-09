import { test } from '@playwright/test';
import { PALETTE } from './constant';
import { renderChartAndSnapshot } from './utils/renderChartAndSnapshot';

const boxplotData = [
  { category: 'Adelie', value: 181 },
  { category: 'Adelie', value: 190 },
  { category: 'Adelie', value: 195 },
  { category: 'Adelie', value: 191 },
  { category: 'Adelie', value: 198 },
  { category: 'Adelie', value: 197 },
  { category: 'Adelie', value: 194 },
  { category: 'Adelie', value: 180 },
  { category: 'Adelie', value: 185 },
  { category: 'Adelie', value: 180 },
  { category: 'Adelie', value: 183 },
  { category: 'Adelie', value: 180 },
  { category: 'Adelie', value: 178 },
  { category: 'Adelie', value: 184 },
  { category: 'Adelie', value: 196 },
  { category: 'Adelie', value: 190 },
  { category: 'Adelie', value: 184 },
  { category: 'Adelie', value: 195 },
  { category: 'Adelie', value: 196 },
  { category: 'Adelie', value: 190 },
  { category: 'Adelie', value: 182 },
  { category: 'Adelie', value: 191 },
  { category: 'Adelie', value: 188 },
  { category: 'Adelie', value: 200 },
  { category: 'Adelie', value: 191 },
  { category: 'Adelie', value: 193 },
  { category: 'Adelie', value: 194 },
  { category: 'Adelie', value: 195 },
  { category: 'Adelie', value: 192 },
  { category: 'Adelie', value: 192 },
  { category: 'Adelie', value: 188 },
  { category: 'Adelie', value: 198 },
  { category: 'Adelie', value: 190 },
  { category: 'Adelie', value: 197 },
  { category: 'Adelie', value: 195 },
  { category: 'Adelie', value: 184 },
  { category: 'Adelie', value: 195 },
  { category: 'Adelie', value: 196 },
  { category: 'Adelie', value: 193 },
  { category: 'Adelie', value: 194 },
  { category: 'Adelie', value: 190 },
  { category: 'Adelie', value: 189 },
  { category: 'Adelie', value: 205 },
  { category: 'Adelie', value: 186 },
  { category: 'Adelie', value: 208 },
  { category: 'Adelie', value: 196 },
  { category: 'Adelie', value: 192 },
  { category: 'Adelie', value: 203 },
  { category: 'Adelie', value: 190 },
  { category: 'Adelie', value: 184 },
  { category: 'Adelie', value: 190 },
  { category: 'Adelie', value: 197 },
  { category: 'Adelie', value: 191 },
  { category: 'Adelie', value: 197 },
  { category: 'Adelie', value: 196 },
  { category: 'Adelie', value: 199 },
  { category: 'Adelie', value: 189 },
  { category: 'Adelie', value: 198 },
  { category: 'Adelie', value: 202 },
  { category: 'Adelie', value: 199 },
  { category: 'Adelie', value: 195 },
  { category: 'Adelie', value: 210 },
  { category: 'Adelie', value: 197 },
  { category: 'Adelie', value: 199 },
  { category: 'Adelie', value: 190 },
  { category: 'Adelie', value: 200 },
  { category: 'Adelie', value: 193 },
  { category: 'Adelie', value: 187 },
  { category: 'Adelie', value: 190 },
  { category: 'Adelie', value: 185 },
  { category: 'Adelie', value: 190 },
  { category: 'Adelie', value: 193 },
  { category: 'Adelie', value: 201 },
  { category: 'Chinstrap', value: 196 },
  { category: 'Chinstrap', value: 193 },
  { category: 'Chinstrap', value: 197 },
  { category: 'Chinstrap', value: 197 },
  { category: 'Chinstrap', value: 198 },
  { category: 'Chinstrap', value: 194 },
  { category: 'Chinstrap', value: 201 },
  { category: 'Chinstrap', value: 201 },
  { category: 'Chinstrap', value: 197 },
  { category: 'Chinstrap', value: 195 },
  { category: 'Chinstrap', value: 191 },
  { category: 'Chinstrap', value: 193 },
  { category: 'Chinstrap', value: 197 },
  { category: 'Chinstrap', value: 200 },
  { category: 'Chinstrap', value: 205 },
  { category: 'Chinstrap', value: 201 },
  { category: 'Chinstrap', value: 203 },
  { category: 'Chinstrap', value: 195 },
  { category: 'Chinstrap', value: 210 },
  { category: 'Chinstrap', value: 205 },
  { category: 'Chinstrap', value: 210 },
  { category: 'Chinstrap', value: 196 },
  { category: 'Chinstrap', value: 201 },
  { category: 'Chinstrap', value: 212 },
  { category: 'Chinstrap', value: 187 },
  { category: 'Chinstrap', value: 201 },
  { category: 'Chinstrap', value: 203 },
  { category: 'Chinstrap', value: 197 },
  { category: 'Chinstrap', value: 203 },
  { category: 'Chinstrap', value: 202 },
  { category: 'Chinstrap', value: 206 },
  { category: 'Chinstrap', value: 207 },
  { category: 'Chinstrap', value: 193 },
  { category: 'Chinstrap', value: 210 },
  { category: 'Gentoo', value: 230 },
  { category: 'Gentoo', value: 218 },
  { category: 'Gentoo', value: 215 },
  { category: 'Gentoo', value: 219 },
  { category: 'Gentoo', value: 215 },
  { category: 'Gentoo', value: 216 },
  { category: 'Gentoo', value: 213 },
  { category: 'Gentoo', value: 217 },
  { category: 'Gentoo', value: 221 },
  { category: 'Gentoo', value: 222 },
  { category: 'Gentoo', value: 218 },
  { category: 'Gentoo', value: 215 },
  { category: 'Gentoo', value: 215 },
  { category: 'Gentoo', value: 215 },
  { category: 'Gentoo', value: 220 },
  { category: 'Gentoo', value: 222 },
  { category: 'Gentoo', value: 230 },
  { category: 'Gentoo', value: 220 },
  { category: 'Gentoo', value: 219 },
  { category: 'Gentoo', value: 208 },
  { category: 'Gentoo', value: 225 },
  { category: 'Gentoo', value: 216 },
  { category: 'Gentoo', value: 222 },
  { category: 'Gentoo', value: 225 },
  { category: 'Gentoo', value: 215 },
  { category: 'Gentoo', value: 220 },
  { category: 'Gentoo', value: 225 },
  { category: 'Gentoo', value: 220 },
  { category: 'Gentoo', value: 220 },
  { category: 'Gentoo', value: 224 },
  { category: 'Gentoo', value: 221 },
  { category: 'Gentoo', value: 231 },
  { category: 'Gentoo', value: 230 },
  { category: 'Gentoo', value: 229 },
  { category: 'Gentoo', value: 223 },
  { category: 'Gentoo', value: 221 },
  { category: 'Gentoo', value: 221 },
  { category: 'Gentoo', value: 230 },
  { category: 'Gentoo', value: 220 },
  { category: 'Gentoo', value: 223 },
  { category: 'Gentoo', value: 221 },
  { category: 'Gentoo', value: 224 },
  { category: 'Gentoo', value: 228 },
  { category: 'Gentoo', value: 218 },
  { category: 'Gentoo', value: 230 },
  { category: 'Gentoo', value: 228 },
  { category: 'Gentoo', value: 224 },
  { category: 'Gentoo', value: 226 },
  { category: 'Gentoo', value: 216 },
  { category: 'Gentoo', value: 225 },
  { category: 'Gentoo', value: 228 },
  { category: 'Gentoo', value: 228 },
  { category: 'Gentoo', value: 215 },
  { category: 'Gentoo', value: 219 },
  { category: 'Gentoo', value: 209 },
  { category: 'Gentoo', value: 229 },
  { category: 'Gentoo', value: 230 },
  { category: 'Gentoo', value: 230 },
  { category: 'Gentoo', value: 222 },
  { category: 'Gentoo', value: 222 },
  { category: 'Gentoo', value: 213 },
];

test.use({ viewport: { width: 1200, height: 600 } });

test.describe('Boxplot component tests', () => {
  test('boxplot', async ({ page }) => {
    const spec = {
      type: 'boxplot',
      data: boxplotData,
      axisXTitle: 'category',
      axisYTitle: 'value',
    };
    await renderChartAndSnapshot(page, spec, 'boxplot.png');
  });

  test('boxplot-required', async ({ page }) => {
    const spec = {
      type: 'boxplot',
      data: boxplotData,
    };
    await renderChartAndSnapshot(page, spec, 'boxplot-required.png');
  });

  test('boxplot-grouped', async ({ page }) => {
    const spec = {
      type: 'boxplot',
      data: [
        {
          category: 'Adelie',
          group: 'MALE',
          value: 181,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 186,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 195,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 193,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 181,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 195,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 182,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 191,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 198,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 185,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 195,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 197,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 184,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 194,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 174,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 180,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 189,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 185,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 180,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 183,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 172,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 180,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 178,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 178,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 188,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 184,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 195,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 196,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 180,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 181,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 184,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 182,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 195,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 186,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 196,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 185,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 182,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 191,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 186,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 188,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 200,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 191,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 186,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 193,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 181,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 194,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 185,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 195,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 185,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 192,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 184,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 192,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 195,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 188,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 198,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 196,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 197,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 195,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 191,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 184,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 195,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 189,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 196,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 193,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 191,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 194,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 189,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 189,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 202,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 205,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 185,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 186,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 208,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 196,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 178,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 192,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 192,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 203,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 183,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 193,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 184,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 199,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 181,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 197,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 198,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 191,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 193,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 197,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 191,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 196,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 188,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 199,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 189,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 189,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 198,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 176,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 202,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 186,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 199,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 191,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 195,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 191,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 210,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 197,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 193,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 199,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 191,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 200,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 185,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 193,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 193,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 187,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 188,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 192,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 185,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 190,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 184,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 195,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 193,
        },
        {
          category: 'Adelie',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Adelie',
          group: 'MALE',
          value: 201,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 192,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 196,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 193,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 188,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 197,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 198,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 178,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 197,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 195,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 198,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 193,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 194,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 185,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 201,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 190,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 201,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 197,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 181,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 190,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 195,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 181,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 191,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 193,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 195,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 197,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 200,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 200,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 191,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 205,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 201,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 203,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 195,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 199,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 195,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 210,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 192,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 205,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 210,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 196,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 196,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 196,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 201,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 190,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 212,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 187,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 198,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 199,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 201,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 193,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 203,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 187,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 197,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 191,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 203,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 202,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 194,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 206,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 189,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 195,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 207,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 202,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 193,
        },
        {
          category: 'Chinstrap',
          group: 'MALE',
          value: 210,
        },
        {
          category: 'Chinstrap',
          group: 'FEMALE',
          value: 198,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 211,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 230,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 210,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 218,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 215,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 210,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 211,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 219,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 209,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 215,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 214,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 216,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 214,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 213,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 210,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 217,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 210,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 221,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 209,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 222,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 218,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 215,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 213,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 215,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 215,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 215,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 215,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 210,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 220,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 222,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 209,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 207,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 230,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 220,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 220,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 213,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 219,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 208,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 208,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 208,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 225,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 210,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 216,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 222,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 217,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 210,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 225,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 213,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 215,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 210,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 220,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 210,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 225,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 217,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 220,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 208,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 220,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 208,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 224,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 208,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 221,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 214,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 231,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 219,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 230,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 229,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 220,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 223,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 216,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 221,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 221,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 217,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 216,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 230,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 209,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 220,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 215,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 223,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 212,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 221,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 212,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 224,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 212,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 228,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 218,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 218,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 212,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 230,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 218,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 228,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 212,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 224,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 214,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 226,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 216,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 222,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 203,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 225,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 219,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 228,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 215,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 228,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 215,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 210,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 219,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 208,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 209,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 216,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 229,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 213,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 230,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 217,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 230,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 222,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 214,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 215,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 222,
        },
        {
          category: 'Gentoo',
          group: 'FEMALE',
          value: 212,
        },
        {
          category: 'Gentoo',
          group: 'MALE',
          value: 213,
        },
      ],
    };
    await renderChartAndSnapshot(page, spec, 'boxplot-grouped.png');
  });

  test('boxplot-academy', async ({ page }) => {
    const spec = {
      theme: 'academy',
      type: 'boxplot',
      data: boxplotData,
      axisXTitle: 'category',
      axisYTitle: 'value',
    };
    await renderChartAndSnapshot(page, spec, 'boxplot-academy.png');
  });

  test('boxplot-style', async ({ page }) => {
    const spec = {
      type: 'boxplot',
      data: boxplotData,
      axisXTitle: 'category',
      axisYTitle: 'value',
      style: {
        backgroundColor: 'transparent',
        palette: PALETTE,
      },
    };
    await renderChartAndSnapshot(page, spec, 'boxplot-style.png');
  });

  test('boxplot-startOnZero', async ({ page }) => {
    const spec = {
      type: 'boxplot',
      data: boxplotData,
      axisXTitle: 'category',
      axisYTitle: 'value',
      startOnZero: true,
    };
    await renderChartAndSnapshot(page, spec, 'boxplot-startOnZero.png');
  });
});
