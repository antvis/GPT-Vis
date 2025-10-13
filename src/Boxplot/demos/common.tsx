import { Boxplot } from '@antv/gpt-vis';
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';

const data = [
  { category: 'Adelie', group: 'MALE', value: 181 },
  { category: 'Adelie', group: 'FEMALE', value: 186 },
  { category: 'Adelie', group: 'FEMALE', value: 195 },
  { category: 'Adelie', group: 'FEMALE', value: 193 },
  { category: 'Adelie', group: 'MALE', value: 190 },
  { category: 'Adelie', group: 'FEMALE', value: 181 },
  { category: 'Adelie', group: 'MALE', value: 195 },
  { category: 'Adelie', group: 'FEMALE', value: 182 },
  { category: 'Adelie', group: 'MALE', value: 191 },
  { category: 'Adelie', group: 'MALE', value: 198 },
  { category: 'Adelie', group: 'FEMALE', value: 185 },
  { category: 'Adelie', group: 'FEMALE', value: 195 },
  { category: 'Adelie', group: 'MALE', value: 197 },
  { category: 'Adelie', group: 'FEMALE', value: 184 },
  { category: 'Adelie', group: 'MALE', value: 194 },
  { category: 'Adelie', group: 'FEMALE', value: 174 },
  { category: 'Adelie', group: 'MALE', value: 180 },
  { category: 'Adelie', group: 'FEMALE', value: 189 },
  { category: 'Adelie', group: 'MALE', value: 185 },
  { category: 'Adelie', group: 'MALE', value: 180 },
  { category: 'Adelie', group: 'FEMALE', value: 187 },
  { category: 'Adelie', group: 'MALE', value: 183 },
  { category: 'Adelie', group: 'FEMALE', value: 187 },
  { category: 'Adelie', group: 'FEMALE', value: 172 },
  { category: 'Adelie', group: 'MALE', value: 180 },
  { category: 'Adelie', group: 'FEMALE', value: 178 },
  { category: 'Adelie', group: 'MALE', value: 178 },
  { category: 'Adelie', group: 'FEMALE', value: 188 },
  { category: 'Adelie', group: 'MALE', value: 184 },
  { category: 'Adelie', group: 'FEMALE', value: 195 },
  { category: 'Adelie', group: 'MALE', value: 196 },
  { category: 'Adelie', group: 'MALE', value: 190 },
  { category: 'Adelie', group: 'FEMALE', value: 180 },
  { category: 'Adelie', group: 'FEMALE', value: 181 },
  { category: 'Adelie', group: 'MALE', value: 184 },
  { category: 'Adelie', group: 'FEMALE', value: 182 },
  { category: 'Adelie', group: 'MALE', value: 195 },
  { category: 'Adelie', group: 'FEMALE', value: 186 },
  { category: 'Adelie', group: 'MALE', value: 196 },
  { category: 'Adelie', group: 'FEMALE', value: 185 },
  { category: 'Adelie', group: 'MALE', value: 190 },
  { category: 'Adelie', group: 'MALE', value: 182 },
  { category: 'Adelie', group: 'FEMALE', value: 190 },
  { category: 'Adelie', group: 'MALE', value: 191 },
  { category: 'Adelie', group: 'FEMALE', value: 186 },
  { category: 'Adelie', group: 'MALE', value: 188 },
  { category: 'Adelie', group: 'FEMALE', value: 190 },
  { category: 'Adelie', group: 'MALE', value: 200 },
  { category: 'Adelie', group: 'FEMALE', value: 187 },
  { category: 'Adelie', group: 'MALE', value: 191 },
  { category: 'Adelie', group: 'FEMALE', value: 186 },
  { category: 'Adelie', group: 'MALE', value: 193 },
  { category: 'Adelie', group: 'FEMALE', value: 181 },
  { category: 'Adelie', group: 'MALE', value: 194 },
  { category: 'Adelie', group: 'FEMALE', value: 185 },
  { category: 'Adelie', group: 'MALE', value: 195 },
  { category: 'Adelie', group: 'FEMALE', value: 185 },
  { category: 'Adelie', group: 'MALE', value: 192 },
  { category: 'Adelie', group: 'FEMALE', value: 184 },
  { category: 'Adelie', group: 'MALE', value: 192 },
  { category: 'Adelie', group: 'FEMALE', value: 195 },
  { category: 'Adelie', group: 'MALE', value: 188 },
  { category: 'Adelie', group: 'FEMALE', value: 190 },
  { category: 'Adelie', group: 'MALE', value: 198 },
  { category: 'Adelie', group: 'FEMALE', value: 190 },
  { category: 'Adelie', group: 'MALE', value: 190 },
  { category: 'Adelie', group: 'FEMALE', value: 196 },
  { category: 'Adelie', group: 'MALE', value: 197 },
  { category: 'Adelie', group: 'FEMALE', value: 190 },
  { category: 'Adelie', group: 'MALE', value: 195 },
  { category: 'Adelie', group: 'FEMALE', value: 191 },
  { category: 'Adelie', group: 'MALE', value: 184 },
  { category: 'Adelie', group: 'FEMALE', value: 187 },
  { category: 'Adelie', group: 'MALE', value: 195 },
  { category: 'Adelie', group: 'FEMALE', value: 189 },
  { category: 'Adelie', group: 'MALE', value: 196 },
  { category: 'Adelie', group: 'FEMALE', value: 187 },
  { category: 'Adelie', group: 'MALE', value: 193 },
  { category: 'Adelie', group: 'FEMALE', value: 191 },
  { category: 'Adelie', group: 'MALE', value: 194 },
  { category: 'Adelie', group: 'MALE', value: 190 },
  { category: 'Adelie', group: 'FEMALE', value: 189 },
  { category: 'Adelie', group: 'MALE', value: 189 },
  { category: 'Adelie', group: 'FEMALE', value: 190 },
  { category: 'Adelie', group: 'FEMALE', value: 202 },
  { category: 'Adelie', group: 'MALE', value: 205 },
  { category: 'Adelie', group: 'FEMALE', value: 185 },
  { category: 'Adelie', group: 'MALE', value: 186 },
  { category: 'Adelie', group: 'FEMALE', value: 187 },
  { category: 'Adelie', group: 'MALE', value: 208 },
  { category: 'Adelie', group: 'FEMALE', value: 190 },
  { category: 'Adelie', group: 'MALE', value: 196 },
  { category: 'Adelie', group: 'FEMALE', value: 178 },
  { category: 'Adelie', group: 'MALE', value: 192 },
  { category: 'Adelie', group: 'FEMALE', value: 192 },
  { category: 'Adelie', group: 'MALE', value: 203 },
  { category: 'Adelie', group: 'FEMALE', value: 183 },
  { category: 'Adelie', group: 'MALE', value: 190 },
  { category: 'Adelie', group: 'FEMALE', value: 193 },
  { category: 'Adelie', group: 'MALE', value: 184 },
  { category: 'Adelie', group: 'FEMALE', value: 199 },
  { category: 'Adelie', group: 'MALE', value: 190 },
  { category: 'Adelie', group: 'FEMALE', value: 181 },
  { category: 'Adelie', group: 'MALE', value: 197 },
  { category: 'Adelie', group: 'FEMALE', value: 198 },
  { category: 'Adelie', group: 'MALE', value: 191 },
  { category: 'Adelie', group: 'FEMALE', value: 193 },
  { category: 'Adelie', group: 'MALE', value: 197 },
  { category: 'Adelie', group: 'FEMALE', value: 191 },
  { category: 'Adelie', group: 'MALE', value: 196 },
  { category: 'Adelie', group: 'FEMALE', value: 188 },
  { category: 'Adelie', group: 'MALE', value: 199 },
  { category: 'Adelie', group: 'FEMALE', value: 189 },
  { category: 'Adelie', group: 'MALE', value: 189 },
  { category: 'Adelie', group: 'FEMALE', value: 187 },
  { category: 'Adelie', group: 'MALE', value: 198 },
  { category: 'Adelie', group: 'FEMALE', value: 176 },
  { category: 'Adelie', group: 'MALE', value: 202 },
  { category: 'Adelie', group: 'FEMALE', value: 186 },
  { category: 'Adelie', group: 'MALE', value: 199 },
  { category: 'Adelie', group: 'FEMALE', value: 191 },
  { category: 'Adelie', group: 'MALE', value: 195 },
  { category: 'Adelie', group: 'FEMALE', value: 191 },
  { category: 'Adelie', group: 'MALE', value: 210 },
  { category: 'Adelie', group: 'FEMALE', value: 190 },
  { category: 'Adelie', group: 'MALE', value: 197 },
  { category: 'Adelie', group: 'FEMALE', value: 193 },
  { category: 'Adelie', group: 'MALE', value: 199 },
  { category: 'Adelie', group: 'FEMALE', value: 187 },
  { category: 'Adelie', group: 'MALE', value: 190 },
  { category: 'Adelie', group: 'FEMALE', value: 191 },
  { category: 'Adelie', group: 'MALE', value: 200 },
  { category: 'Adelie', group: 'FEMALE', value: 185 },
  { category: 'Adelie', group: 'MALE', value: 193 },
  { category: 'Adelie', group: 'FEMALE', value: 193 },
  { category: 'Adelie', group: 'MALE', value: 187 },
  { category: 'Adelie', group: 'FEMALE', value: 188 },
  { category: 'Adelie', group: 'MALE', value: 190 },
  { category: 'Adelie', group: 'FEMALE', value: 192 },
  { category: 'Adelie', group: 'MALE', value: 185 },
  { category: 'Adelie', group: 'MALE', value: 190 },
  { category: 'Adelie', group: 'FEMALE', value: 184 },
  { category: 'Adelie', group: 'FEMALE', value: 195 },
  { category: 'Adelie', group: 'MALE', value: 193 },
  { category: 'Adelie', group: 'FEMALE', value: 187 },
  { category: 'Adelie', group: 'MALE', value: 201 },
  { category: 'Chinstrap', group: 'FEMALE', value: 192 },
  { category: 'Chinstrap', group: 'MALE', value: 196 },
  { category: 'Chinstrap', group: 'MALE', value: 193 },
  { category: 'Chinstrap', group: 'FEMALE', value: 188 },
  { category: 'Chinstrap', group: 'MALE', value: 197 },
  { category: 'Chinstrap', group: 'FEMALE', value: 198 },
  { category: 'Chinstrap', group: 'FEMALE', value: 178 },
  { category: 'Chinstrap', group: 'MALE', value: 197 },
  { category: 'Chinstrap', group: 'FEMALE', value: 195 },
  { category: 'Chinstrap', group: 'MALE', value: 198 },
  { category: 'Chinstrap', group: 'FEMALE', value: 193 },
  { category: 'Chinstrap', group: 'MALE', value: 194 },
  { category: 'Chinstrap', group: 'FEMALE', value: 185 },
  { category: 'Chinstrap', group: 'MALE', value: 201 },
  { category: 'Chinstrap', group: 'FEMALE', value: 190 },
  { category: 'Chinstrap', group: 'MALE', value: 201 },
  { category: 'Chinstrap', group: 'MALE', value: 197 },
  { category: 'Chinstrap', group: 'FEMALE', value: 181 },
  { category: 'Chinstrap', group: 'FEMALE', value: 190 },
  { category: 'Chinstrap', group: 'MALE', value: 195 },
  { category: 'Chinstrap', group: 'FEMALE', value: 181 },
  { category: 'Chinstrap', group: 'MALE', value: 191 },
  { category: 'Chinstrap', group: 'FEMALE', value: 187 },
  { category: 'Chinstrap', group: 'MALE', value: 193 },
  { category: 'Chinstrap', group: 'FEMALE', value: 195 },
  { category: 'Chinstrap', group: 'MALE', value: 197 },
  { category: 'Chinstrap', group: 'FEMALE', value: 200 },
  { category: 'Chinstrap', group: 'MALE', value: 200 },
  { category: 'Chinstrap', group: 'FEMALE', value: 191 },
  { category: 'Chinstrap', group: 'MALE', value: 205 },
  { category: 'Chinstrap', group: 'FEMALE', value: 187 },
  { category: 'Chinstrap', group: 'MALE', value: 201 },
  { category: 'Chinstrap', group: 'FEMALE', value: 187 },
  { category: 'Chinstrap', group: 'MALE', value: 203 },
  { category: 'Chinstrap', group: 'MALE', value: 195 },
  { category: 'Chinstrap', group: 'FEMALE', value: 199 },
  { category: 'Chinstrap', group: 'FEMALE', value: 195 },
  { category: 'Chinstrap', group: 'MALE', value: 210 },
  { category: 'Chinstrap', group: 'FEMALE', value: 192 },
  { category: 'Chinstrap', group: 'MALE', value: 205 },
  { category: 'Chinstrap', group: 'MALE', value: 210 },
  { category: 'Chinstrap', group: 'FEMALE', value: 187 },
  { category: 'Chinstrap', group: 'MALE', value: 196 },
  { category: 'Chinstrap', group: 'FEMALE', value: 196 },
  { category: 'Chinstrap', group: 'FEMALE', value: 196 },
  { category: 'Chinstrap', group: 'MALE', value: 201 },
  { category: 'Chinstrap', group: 'FEMALE', value: 190 },
  { category: 'Chinstrap', group: 'MALE', value: 212 },
  { category: 'Chinstrap', group: 'MALE', value: 187 },
  { category: 'Chinstrap', group: 'FEMALE', value: 198 },
  { category: 'Chinstrap', group: 'FEMALE', value: 199 },
  { category: 'Chinstrap', group: 'MALE', value: 201 },
  { category: 'Chinstrap', group: 'FEMALE', value: 193 },
  { category: 'Chinstrap', group: 'MALE', value: 203 },
  { category: 'Chinstrap', group: 'FEMALE', value: 187 },
  { category: 'Chinstrap', group: 'MALE', value: 197 },
  { category: 'Chinstrap', group: 'FEMALE', value: 191 },
  { category: 'Chinstrap', group: 'MALE', value: 203 },
  { category: 'Chinstrap', group: 'MALE', value: 202 },
  { category: 'Chinstrap', group: 'FEMALE', value: 194 },
  { category: 'Chinstrap', group: 'MALE', value: 206 },
  { category: 'Chinstrap', group: 'FEMALE', value: 189 },
  { category: 'Chinstrap', group: 'FEMALE', value: 195 },
  { category: 'Chinstrap', group: 'MALE', value: 207 },
  { category: 'Chinstrap', group: 'FEMALE', value: 202 },
  { category: 'Chinstrap', group: 'MALE', value: 193 },
  { category: 'Chinstrap', group: 'MALE', value: 210 },
  { category: 'Chinstrap', group: 'FEMALE', value: 198 },
  { category: 'Gentoo', group: 'FEMALE', value: 211 },
  { category: 'Gentoo', group: 'MALE', value: 230 },
  { category: 'Gentoo', group: 'FEMALE', value: 210 },
  { category: 'Gentoo', group: 'MALE', value: 218 },
  { category: 'Gentoo', group: 'MALE', value: 215 },
  { category: 'Gentoo', group: 'FEMALE', value: 210 },
  { category: 'Gentoo', group: 'FEMALE', value: 211 },
  { category: 'Gentoo', group: 'MALE', value: 219 },
  { category: 'Gentoo', group: 'FEMALE', value: 209 },
  { category: 'Gentoo', group: 'MALE', value: 215 },
  { category: 'Gentoo', group: 'FEMALE', value: 214 },
  { category: 'Gentoo', group: 'MALE', value: 216 },
  { category: 'Gentoo', group: 'FEMALE', value: 214 },
  { category: 'Gentoo', group: 'MALE', value: 213 },
  { category: 'Gentoo', group: 'FEMALE', value: 210 },
  { category: 'Gentoo', group: 'MALE', value: 217 },
  { category: 'Gentoo', group: 'FEMALE', value: 210 },
  { category: 'Gentoo', group: 'MALE', value: 221 },
  { category: 'Gentoo', group: 'FEMALE', value: 209 },
  { category: 'Gentoo', group: 'MALE', value: 222 },
  { category: 'Gentoo', group: 'MALE', value: 218 },
  { category: 'Gentoo', group: 'FEMALE', value: 215 },
  { category: 'Gentoo', group: 'FEMALE', value: 213 },
  { category: 'Gentoo', group: 'MALE', value: 215 },
  { category: 'Gentoo', group: 'FEMALE', value: 215 },
  { category: 'Gentoo', group: 'MALE', value: 215 },
  { category: 'Gentoo', group: 'MALE', value: 215 },
  { category: 'Gentoo', group: 'FEMALE', value: 210 },
  { category: 'Gentoo', group: 'MALE', value: 220 },
  { category: 'Gentoo', group: 'MALE', value: 222 },
  { category: 'Gentoo', group: 'FEMALE', value: 209 },
  { category: 'Gentoo', group: 'FEMALE', value: 207 },
  { category: 'Gentoo', group: 'MALE', value: 230 },
  { category: 'Gentoo', group: 'FEMALE', value: 220 },
  { category: 'Gentoo', group: 'MALE', value: 220 },
  { category: 'Gentoo', group: 'FEMALE', value: 213 },
  { category: 'Gentoo', group: 'MALE', value: 219 },
  { category: 'Gentoo', group: 'FEMALE', value: 208 },
  { category: 'Gentoo', group: 'MALE', value: 208 },
  { category: 'Gentoo', group: 'FEMALE', value: 208 },
  { category: 'Gentoo', group: 'MALE', value: 225 },
  { category: 'Gentoo', group: 'FEMALE', value: 210 },
  { category: 'Gentoo', group: 'MALE', value: 216 },
  { category: 'Gentoo', group: 'MALE', value: 222 },
  { category: 'Gentoo', group: 'FEMALE', value: 217 },
  { category: 'Gentoo', group: 'FEMALE', value: 210 },
  { category: 'Gentoo', group: 'MALE', value: 225 },
  { category: 'Gentoo', group: 'FEMALE', value: 213 },
  { category: 'Gentoo', group: 'MALE', value: 215 },
  { category: 'Gentoo', group: 'FEMALE', value: 210 },
  { category: 'Gentoo', group: 'MALE', value: 220 },
  { category: 'Gentoo', group: 'FEMALE', value: 210 },
  { category: 'Gentoo', group: 'MALE', value: 225 },
  { category: 'Gentoo', group: 'FEMALE', value: 217 },
  { category: 'Gentoo', group: 'MALE', value: 220 },
  { category: 'Gentoo', group: 'FEMALE', value: 208 },
  { category: 'Gentoo', group: 'MALE', value: 220 },
  { category: 'Gentoo', group: 'FEMALE', value: 208 },
  { category: 'Gentoo', group: 'MALE', value: 224 },
  { category: 'Gentoo', group: 'FEMALE', value: 208 },
  { category: 'Gentoo', group: 'MALE', value: 221 },
  { category: 'Gentoo', group: 'FEMALE', value: 214 },
  { category: 'Gentoo', group: 'MALE', value: 231 },
  { category: 'Gentoo', group: 'FEMALE', value: 219 },
  { category: 'Gentoo', group: 'MALE', value: 230 },
  { category: 'Gentoo', group: 'MALE', value: 229 },
  { category: 'Gentoo', group: 'FEMALE', value: 220 },
  { category: 'Gentoo', group: 'MALE', value: 223 },
  { category: 'Gentoo', group: 'FEMALE', value: 216 },
  { category: 'Gentoo', group: 'MALE', value: 221 },
  { category: 'Gentoo', group: 'MALE', value: 221 },
  { category: 'Gentoo', group: 'FEMALE', value: 217 },
  { category: 'Gentoo', group: 'FEMALE', value: 216 },
  { category: 'Gentoo', group: 'MALE', value: 230 },
  { category: 'Gentoo', group: 'FEMALE', value: 209 },
  { category: 'Gentoo', group: 'MALE', value: 220 },
  { category: 'Gentoo', group: 'FEMALE', value: 215 },
  { category: 'Gentoo', group: 'MALE', value: 223 },
  { category: 'Gentoo', group: 'FEMALE', value: 212 },
  { category: 'Gentoo', group: 'MALE', value: 221 },
  { category: 'Gentoo', group: 'FEMALE', value: 212 },
  { category: 'Gentoo', group: 'MALE', value: 224 },
  { category: 'Gentoo', group: 'FEMALE', value: 212 },
  { category: 'Gentoo', group: 'MALE', value: 228 },
  { category: 'Gentoo', group: 'FEMALE', value: 218 },
  { category: 'Gentoo', group: 'MALE', value: 218 },
  { category: 'Gentoo', group: 'FEMALE', value: 212 },
  { category: 'Gentoo', group: 'MALE', value: 230 },
  { category: 'Gentoo', group: 'FEMALE', value: 218 },
  { category: 'Gentoo', group: 'MALE', value: 228 },
  { category: 'Gentoo', group: 'FEMALE', value: 212 },
  { category: 'Gentoo', group: 'MALE', value: 224 },
  { category: 'Gentoo', group: 'FEMALE', value: 214 },
  { category: 'Gentoo', group: 'MALE', value: 226 },
  { category: 'Gentoo', group: 'MALE', value: 216 },
  { category: 'Gentoo', group: 'FEMALE', value: 222 },
  { category: 'Gentoo', group: 'FEMALE', value: 203 },
  { category: 'Gentoo', group: 'MALE', value: 225 },
  { category: 'Gentoo', group: 'FEMALE', value: 219 },
  { category: 'Gentoo', group: 'MALE', value: 228 },
  { category: 'Gentoo', group: 'FEMALE', value: 215 },
  { category: 'Gentoo', group: 'MALE', value: 228 },
  { category: 'Gentoo', group: 'MALE', value: 215 },
  { category: 'Gentoo', group: 'FEMALE', value: 210 },
  { category: 'Gentoo', group: 'MALE', value: 219 },
  { category: 'Gentoo', group: 'FEMALE', value: 208 },
  { category: 'Gentoo', group: 'MALE', value: 209 },
  { category: 'Gentoo', group: 'FEMALE', value: 216 },
  { category: 'Gentoo', group: 'MALE', value: 229 },
  { category: 'Gentoo', group: 'FEMALE', value: 213 },
  { category: 'Gentoo', group: 'MALE', value: 230 },
  { category: 'Gentoo', group: 'FEMALE', value: 217 },
  { category: 'Gentoo', group: 'MALE', value: 230 },
  { category: 'Gentoo', group: 'MALE', value: 222 },
  { category: 'Gentoo', group: 'FEMALE', value: 214 },
  { category: 'Gentoo', group: 'FEMALE', value: 215 },
  { category: 'Gentoo', group: 'MALE', value: 222 },
  { category: 'Gentoo', group: 'FEMALE', value: 212 },
  { category: 'Gentoo', group: 'MALE', value: 213 },
];

const themes = ['default', 'academy', 'dark'] as const;
export const PALETTE_1 = ['#8459fc', '#ff89bd', '#1677ff', '#00c2ff', '#ff9a00'];
export const PALETTE_2 = ['#1B9E77', '#D95F02', '#7570B3', '#E7298A', '#66A61E'];
export const PALETTE_3 = ['#7593ed', '#95e3b0', '#6c7893', '#e7c450', '#7460eb'];

export default () => {
  const [theme, setTheme] = useState<'default' | 'academy' | 'dark'>('default');
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [palette, setPalette] = useState<string[]>([]);

  const onValuesChange = (changedValues: {
    theme: 'default' | 'academy' | 'dark';
    lineWidth: number;
    backgroundColor: string;
    palette: string[];
  }) => {
    if (changedValues.theme) {
      setTheme(changedValues.theme);
      setPalette([]);
    }
    if (changedValues.backgroundColor !== undefined)
      setBackgroundColor(changedValues.backgroundColor);
    if (changedValues.palette !== undefined) {
      let newPalette = changedValues.palette;
      if (typeof newPalette === 'string') {
        try {
          newPalette = JSON.parse(newPalette);
        } catch {
          newPalette = [];
        }
      }
      setPalette(Array.isArray(newPalette) ? newPalette : []);
    } else {
      setPalette([]);
    }
  };

  return (
    <div>
      <Form
        layout="inline"
        style={{ marginBottom: 12 }}
        initialValues={{ theme, backgroundColor, palette }}
        key={theme}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="Theme" name="theme" style={{ marginBottom: 6 }}>
          <Select style={{ width: 120 }} options={themes.map((t) => ({ label: t, value: t }))} />
        </Form.Item>
        <Form.Item
          label="Background"
          name="backgroundColor"
          rules={[
            {
              pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
              message: '请输入有效的色值编码，例如 #fff 或 #ffffff',
            },
          ]}
          style={{ marginBottom: 6 }}
        >
          <Input placeholder="#ffffff" style={{ width: 120 }} />
        </Form.Item>
        <Form.Item label="Palette" name="palette" style={{ marginBottom: 6 }}>
          <Select
            placeholder="选择调色板"
            style={{ width: 200 }}
            options={[
              {
                label: `色板1: ${PALETTE_1.join(', ')}`,
                value: JSON.stringify(PALETTE_1),
              },
              {
                label: `色板2: ${PALETTE_2.join(', ')}`,
                value: JSON.stringify(PALETTE_2),
              },
              {
                label: `色板3: ${PALETTE_3.join(', ')}`,
                value: JSON.stringify(PALETTE_3),
              },
            ]}
            allowClear
          />
        </Form.Item>
      </Form>
      <Boxplot
        data={data}
        title="Box Plot Example"
        theme={theme}
        style={{ backgroundColor, palette }}
      />
    </div>
  );
};
