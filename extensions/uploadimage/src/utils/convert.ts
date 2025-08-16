/*
 * @Author: Yang
 * @Date: 2025-08-15 21:50:48
 * @Description: 请填写简介
 */
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function convertToAvif(
  inputPath: string,
  avifencPath: string = "/opt/homebrew/bin/avifenc",
): Promise<string> {
  try {
    const outputPath = path.join(path.dirname(inputPath), path.basename(inputPath, path.extname(inputPath)) + ".avif");

    // 使用系统命令行工具 avifenc 进行 AVIF 转换
    await execFileAsync(avifencPath, ["-q", "80", "-s", "6", inputPath, outputPath]);

    return outputPath;
  } catch (error: unknown) {
    console.error("AVIF conversion error:", error);
    // 提供更友好的错误信息
    const err = error as { code?: string; message?: string };
    if (err.code === "ENOENT") {
      throw new Error(
        "AVIF conversion tool not found. Please install libavif using 'brew install libavif' or check the path in extension preferences.",
      );
    }
    throw new Error(`AVIF conversion failed: ${err.message || "Unknown error"}`);
  }
}
