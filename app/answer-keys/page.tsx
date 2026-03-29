"use client";

import React, { useState, useEffect } from "react";

type KeySource = "official" | "image_classes";
type KeyStatus = "available" | "coming_soon" | "processing";

type QuestionAnswer = {
  questionNo: number;
  answer: string;
  subject?: string;
};

type AnswerKey = {
  id: string;
  exam: "AMU" | "JMI";
  class: string;
  stream?: string;
  year: number;
  date: string;
  releaseTime?: string;
  downloads: number;
  status: KeyStatus;
  source: KeySource;
  pdfUrl?: string;
  videoUrl?: string;
  accuracy?: number;
  totalQuestions: number;
  challengedQuestions?: number;
  lastUpdated?: string;
  expertName?: string;
  isVerified?: boolean;
  answers?: QuestionAnswer[];
  subjects?: string[];
  examDate?: string;
  officialSource?: string;
};

type ComparisonResult = {
  questionNo: number;
  subject?: string;
  officialAnswer: string;
  imageClassesAnswer: string;
  isDisputed: boolean;
  explanation?: string;
  correctAnswer?: string;
  disputeReason?: string;
  videoExplanation?: string;
};

// Complete Sample Answer Keys Data
const answerKeys: AnswerKey[] = [
  // ==================== AMU CLASS 6 - 2026 ====================
  {
    id: "amu-6-2026-official",
    exam: "AMU",
    class: "6",
    year: 2026,
    examDate: "March 10, 2026",
    date: "March 18, 2026",
    releaseTime: "5:00 PM",
    downloads: 45000,
    status: "available",
    source: "official",
    pdfUrl: "/answer-keys/amu-class-6-2026-official.pdf",
    totalQuestions: 100,
    lastUpdated: "March 18, 2026",
    officialSource: "AMU Official Website",
    subjects: ["General Knowledge", "Mathematics", "Science", "English", "Urdu/Hindi"],
    answers: [
      { questionNo: 1, answer: "B", subject: "GK" },
      { questionNo: 2, answer: "A", subject: "GK" },
      { questionNo: 3, answer: "C", subject: "GK" },
      { questionNo: 4, answer: "D", subject: "GK" },
      { questionNo: 5, answer: "A", subject: "GK" },
      { questionNo: 6, answer: "B", subject: "GK" },
      { questionNo: 7, answer: "C", subject: "GK" },
      { questionNo: 8, answer: "A", subject: "GK" },
      { questionNo: 9, answer: "D", subject: "GK" },
      { questionNo: 10, answer: "B", subject: "GK" },
      { questionNo: 11, answer: "A", subject: "GK" },
      { questionNo: 12, answer: "C", subject: "GK" },
      { questionNo: 13, answer: "B", subject: "GK" },
      { questionNo: 14, answer: "D", subject: "GK" },
      { questionNo: 15, answer: "A", subject: "GK" },
      { questionNo: 16, answer: "C", subject: "GK" },
      { questionNo: 17, answer: "B", subject: "GK" },
      { questionNo: 18, answer: "A", subject: "GK" },
      { questionNo: 19, answer: "D", subject: "GK" },
      { questionNo: 20, answer: "C", subject: "GK" },
      // Mathematics (21-40)
      { questionNo: 21, answer: "B", subject: "Maths" },
      { questionNo: 22, answer: "A", subject: "Maths" },
      { questionNo: 23, answer: "C", subject: "Maths" }, // DISPUTED
      { questionNo: 24, answer: "D", subject: "Maths" },
      { questionNo: 25, answer: "A", subject: "Maths" },
      { questionNo: 26, answer: "B", subject: "Maths" },
      { questionNo: 27, answer: "C", subject: "Maths" },
      { questionNo: 28, answer: "A", subject: "Maths" },
      { questionNo: 29, answer: "D", subject: "Maths" },
      { questionNo: 30, answer: "B", subject: "Maths" },
      { questionNo: 31, answer: "A", subject: "Maths" },
      { questionNo: 32, answer: "C", subject: "Maths" },
      { questionNo: 33, answer: "B", subject: "Maths" },
      { questionNo: 34, answer: "D", subject: "Maths" },
      { questionNo: 35, answer: "A", subject: "Maths" },
      { questionNo: 36, answer: "C", subject: "Maths" },
      { questionNo: 37, answer: "B", subject: "Maths" },
      { questionNo: 38, answer: "A", subject: "Maths" },
      { questionNo: 39, answer: "D", subject: "Maths" },
      { questionNo: 40, answer: "C", subject: "Maths" },
      // Science (41-60)
      { questionNo: 41, answer: "A", subject: "Science" },
      { questionNo: 42, answer: "B", subject: "Science" },
      { questionNo: 43, answer: "C", subject: "Science" },
      { questionNo: 44, answer: "D", subject: "Science" },
      { questionNo: 45, answer: "A", subject: "Science" }, // DISPUTED
      { questionNo: 46, answer: "B", subject: "Science" },
      { questionNo: 47, answer: "C", subject: "Science" },
      { questionNo: 48, answer: "A", subject: "Science" },
      { questionNo: 49, answer: "D", subject: "Science" },
      { questionNo: 50, answer: "B", subject: "Science" },
      { questionNo: 51, answer: "A", subject: "Science" },
      { questionNo: 52, answer: "C", subject: "Science" },
      { questionNo: 53, answer: "B", subject: "Science" },
      { questionNo: 54, answer: "D", subject: "Science" },
      { questionNo: 55, answer: "A", subject: "Science" },
      { questionNo: 56, answer: "C", subject: "Science" },
      { questionNo: 57, answer: "B", subject: "Science" },
      { questionNo: 58, answer: "A", subject: "Science" },
      { questionNo: 59, answer: "D", subject: "Science" },
      { questionNo: 60, answer: "C", subject: "Science" },
      // English (61-80)
      { questionNo: 61, answer: "B", subject: "English" },
      { questionNo: 62, answer: "A", subject: "English" },
      { questionNo: 63, answer: "C", subject: "English" },
      { questionNo: 64, answer: "D", subject: "English" },
      { questionNo: 65, answer: "A", subject: "English" },
      { questionNo: 66, answer: "B", subject: "English" },
      { questionNo: 67, answer: "C", subject: "English" },
      { questionNo: 68, answer: "A", subject: "English" },
      { questionNo: 69, answer: "D", subject: "English" },
      { questionNo: 70, answer: "B", subject: "English" },
      { questionNo: 71, answer: "A", subject: "English" },
      { questionNo: 72, answer: "C", subject: "English" },
      { questionNo: 73, answer: "B", subject: "English" },
      { questionNo: 74, answer: "D", subject: "English" },
      { questionNo: 75, answer: "A", subject: "English" },
      { questionNo: 76, answer: "C", subject: "English" },
      { questionNo: 77, answer: "B", subject: "English" },
      { questionNo: 78, answer: "A", subject: "English" },
      { questionNo: 79, answer: "D", subject: "English" },
      { questionNo: 80, answer: "C", subject: "English" },
      // Urdu/Hindi (81-100)
      { questionNo: 81, answer: "A", subject: "Urdu" },
      { questionNo: 82, answer: "B", subject: "Urdu" },
      { questionNo: 83, answer: "C", subject: "Urdu" },
      { questionNo: 84, answer: "D", subject: "Urdu" },
      { questionNo: 85, answer: "A", subject: "Urdu" },
      { questionNo: 86, answer: "B", subject: "Urdu" },
      { questionNo: 87, answer: "C", subject: "Urdu" },
      { questionNo: 88, answer: "A", subject: "Urdu" },
      { questionNo: 89, answer: "D", subject: "Urdu" },
      { questionNo: 90, answer: "B", subject: "Urdu" },
      { questionNo: 91, answer: "A", subject: "Urdu" },
      { questionNo: 92, answer: "C", subject: "Urdu" },
      { questionNo: 93, answer: "B", subject: "Urdu" },
      { questionNo: 94, answer: "D", subject: "Urdu" },
      { questionNo: 95, answer: "A", subject: "Urdu" },
      { questionNo: 96, answer: "C", subject: "Urdu" },
      { questionNo: 97, answer: "B", subject: "Urdu" },
      { questionNo: 98, answer: "A", subject: "Urdu" },
      { questionNo: 99, answer: "D", subject: "Urdu" },
      { questionNo: 100, answer: "C", subject: "Urdu" },
    ],
  },
  {
    id: "amu-6-2026-image",
    exam: "AMU",
    class: "6",
    year: 2026,
    examDate: "March 10, 2026",
    date: "March 10, 2026",
    releaseTime: "6:30 PM",
    downloads: 125000,
    status: "available",
    source: "image_classes",
    pdfUrl: "/answer-keys/amu-class-6-2026-image.pdf",
    videoUrl: "https://youtube.com/watch?v=example1",
    accuracy: 98,
    totalQuestions: 100,
    challengedQuestions: 2,
    lastUpdated: "March 10, 2026",
    expertName: "Dr. Ahmad Khan",
    isVerified: true,
    subjects: ["General Knowledge", "Mathematics", "Science", "English", "Urdu/Hindi"],
    answers: [
      { questionNo: 1, answer: "B", subject: "GK" },
      { questionNo: 2, answer: "A", subject: "GK" },
      { questionNo: 3, answer: "C", subject: "GK" },
      { questionNo: 4, answer: "D", subject: "GK" },
      { questionNo: 5, answer: "A", subject: "GK" },
      { questionNo: 6, answer: "B", subject: "GK" },
      { questionNo: 7, answer: "C", subject: "GK" },
      { questionNo: 8, answer: "A", subject: "GK" },
      { questionNo: 9, answer: "D", subject: "GK" },
      { questionNo: 10, answer: "B", subject: "GK" },
      { questionNo: 11, answer: "A", subject: "GK" },
      { questionNo: 12, answer: "C", subject: "GK" },
      { questionNo: 13, answer: "B", subject: "GK" },
      { questionNo: 14, answer: "D", subject: "GK" },
      { questionNo: 15, answer: "A", subject: "GK" },
      { questionNo: 16, answer: "C", subject: "GK" },
      { questionNo: 17, answer: "B", subject: "GK" },
      { questionNo: 18, answer: "A", subject: "GK" },
      { questionNo: 19, answer: "D", subject: "GK" },
      { questionNo: 20, answer: "C", subject: "GK" },
      // Mathematics (21-40)
      { questionNo: 21, answer: "B", subject: "Maths" },
      { questionNo: 22, answer: "A", subject: "Maths" },
      { questionNo: 23, answer: "D", subject: "Maths" }, // DISPUTED - Image Classes says D
      { questionNo: 24, answer: "D", subject: "Maths" },
      { questionNo: 25, answer: "A", subject: "Maths" },
      { questionNo: 26, answer: "B", subject: "Maths" },
      { questionNo: 27, answer: "C", subject: "Maths" },
      { questionNo: 28, answer: "A", subject: "Maths" },
      { questionNo: 29, answer: "D", subject: "Maths" },
      { questionNo: 30, answer: "B", subject: "Maths" },
      { questionNo: 31, answer: "A", subject: "Maths" },
      { questionNo: 32, answer: "C", subject: "Maths" },
      { questionNo: 33, answer: "B", subject: "Maths" },
      { questionNo: 34, answer: "D", subject: "Maths" },
      { questionNo: 35, answer: "A", subject: "Maths" },
      { questionNo: 36, answer: "C", subject: "Maths" },
      { questionNo: 37, answer: "B", subject: "Maths" },
      { questionNo: 38, answer: "A", subject: "Maths" },
      { questionNo: 39, answer: "D", subject: "Maths" },
      { questionNo: 40, answer: "C", subject: "Maths" },
      // Science (41-60)
      { questionNo: 41, answer: "A", subject: "Science" },
      { questionNo: 42, answer: "B", subject: "Science" },
      { questionNo: 43, answer: "C", subject: "Science" },
      { questionNo: 44, answer: "D", subject: "Science" },
      { questionNo: 45, answer: "C", subject: "Science" }, // DISPUTED - Image Classes says C
      { questionNo: 46, answer: "B", subject: "Science" },
      { questionNo: 47, answer: "C", subject: "Science" },
      { questionNo: 48, answer: "A", subject: "Science" },
      { questionNo: 49, answer: "D", subject: "Science" },
      { questionNo: 50, answer: "B", subject: "Science" },
      { questionNo: 51, answer: "A", subject: "Science" },
      { questionNo: 52, answer: "C", subject: "Science" },
      { questionNo: 53, answer: "B", subject: "Science" },
      { questionNo: 54, answer: "D", subject: "Science" },
      { questionNo: 55, answer: "A", subject: "Science" },
      { questionNo: 56, answer: "C", subject: "Science" },
      { questionNo: 57, answer: "B", subject: "Science" },
      { questionNo: 58, answer: "A", subject: "Science" },
      { questionNo: 59, answer: "D", subject: "Science" },
      { questionNo: 60, answer: "C", subject: "Science" },
      // Rest same as official for demo
      { questionNo: 61, answer: "B", subject: "English" },
      { questionNo: 62, answer: "A", subject: "English" },
      { questionNo: 63, answer: "C", subject: "English" },
      { questionNo: 64, answer: "D", subject: "English" },
      { questionNo: 65, answer: "A", subject: "English" },
      { questionNo: 66, answer: "B", subject: "English" },
      { questionNo: 67, answer: "C", subject: "English" },
      { questionNo: 68, answer: "A", subject: "English" },
      { questionNo: 69, answer: "D", subject: "English" },
      { questionNo: 70, answer: "B", subject: "English" },
      { questionNo: 71, answer: "A", subject: "English" },
      { questionNo: 72, answer: "C", subject: "English" },
      { questionNo: 73, answer: "B", subject: "English" },
      { questionNo: 74, answer: "D", subject: "English" },
      { questionNo: 75, answer: "A", subject: "English" },
      { questionNo: 76, answer: "C", subject: "English" },
      { questionNo: 77, answer: "B", subject: "English" },
      { questionNo: 78, answer: "A", subject: "English" },
      { questionNo: 79, answer: "D", subject: "English" },
      { questionNo: 80, answer: "C", subject: "English" },
      { questionNo: 81, answer: "A", subject: "Urdu" },
      { questionNo: 82, answer: "B", subject: "Urdu" },
      { questionNo: 83, answer: "C", subject: "Urdu" },
      { questionNo: 84, answer: "D", subject: "Urdu" },
      { questionNo: 85, answer: "A", subject: "Urdu" },
      { questionNo: 86, answer: "B", subject: "Urdu" },
      { questionNo: 87, answer: "C", subject: "Urdu" },
      { questionNo: 88, answer: "A", subject: "Urdu" },
      { questionNo: 89, answer: "D", subject: "Urdu" },
      { questionNo: 90, answer: "B", subject: "Urdu" },
      { questionNo: 91, answer: "A", subject: "Urdu" },
      { questionNo: 92, answer: "C", subject: "Urdu" },
      { questionNo: 93, answer: "B", subject: "Urdu" },
      { questionNo: 94, answer: "D", subject: "Urdu" },
      { questionNo: 95, answer: "A", subject: "Urdu" },
      { questionNo: 96, answer: "C", subject: "Urdu" },
      { questionNo: 97, answer: "B", subject: "Urdu" },
      { questionNo: 98, answer: "A", subject: "Urdu" },
      { questionNo: 99, answer: "D", subject: "Urdu" },
      { questionNo: 100, answer: "C", subject: "Urdu" },
    ],
  },

  // ==================== AMU CLASS 9 - 2026 ====================
  {
    id: "amu-9-2026-official",
    exam: "AMU",
    class: "9",
    year: 2026,
    examDate: "March 12, 2026",
    date: "March 20, 2026",
    releaseTime: "4:00 PM",
    downloads: 52000,
    status: "available",
    source: "official",
    pdfUrl: "/answer-keys/amu-class-9-2026-official.pdf",
    totalQuestions: 100,
    lastUpdated: "March 20, 2026",
    officialSource: "AMU Official Website",
    subjects: ["Mathematics", "Science", "Social Science", "English", "Urdu/Hindi"],
  },
  {
    id: "amu-9-2026-image",
    exam: "AMU",
    class: "9",
    year: 2026,
    examDate: "March 12, 2026",
    date: "March 12, 2026",
    releaseTime: "7:00 PM",
    downloads: 185000,
    status: "available",
    source: "image_classes",
    pdfUrl: "/answer-keys/amu-class-9-2026-image.pdf",
    videoUrl: "https://youtube.com/watch?v=example2",
    accuracy: 99,
    totalQuestions: 100,
    challengedQuestions: 1,
    lastUpdated: "March 12, 2026",
    expertName: "Prof. Syed Ali Haider",
    isVerified: true,
    subjects: ["Mathematics", "Science", "Social Science", "English", "Urdu/Hindi"],
  },

  // ==================== AMU CLASS 11 PCM - 2026 ====================
  {
    id: "amu-11-pcm-2026-official",
    exam: "AMU",
    class: "11",
    stream: "PCM",
    year: 2026,
    examDate: "March 15, 2026",
    date: "March 25, 2026",
    releaseTime: "3:00 PM",
    downloads: 68000,
    status: "available",
    source: "official",
    pdfUrl: "/answer-keys/amu-class-11-pcm-2026-official.pdf",
    totalQuestions: 150,
    lastUpdated: "March 25, 2026",
    officialSource: "AMU Official Website",
    subjects: ["Physics", "Chemistry", "Mathematics", "English"],
  },
  {
    id: "amu-11-pcm-2026-image",
    exam: "AMU",
    class: "11",
    stream: "PCM",
    year: 2026,
    examDate: "March 15, 2026",
    date: "March 15, 2026",
    releaseTime: "8:00 PM",
    downloads: 245000,
    status: "available",
    source: "image_classes",
    pdfUrl: "/answer-keys/amu-class-11-pcm-2026-image.pdf",
    videoUrl: "https://youtube.com/watch?v=example3",
    accuracy: 97,
    totalQuestions: 150,
    challengedQuestions: 5,
    lastUpdated: "March 15, 2026",
    expertName: "Dr. Rashid Ahmed (Physics), Dr. Fatima Khan (Chemistry)",
    isVerified: true,
    subjects: ["Physics", "Chemistry", "Mathematics", "English"],
  },

  // ==================== AMU CLASS 11 PCB - 2026 ====================
  {
    id: "amu-11-pcb-2026-official",
    exam: "AMU",
    class: "11",
    stream: "PCB",
    year: 2026,
    examDate: "March 16, 2026",
    date: "Coming Soon",
    downloads: 0,
    status: "coming_soon",
    source: "official",
    totalQuestions: 150,
    subjects: ["Physics", "Chemistry", "Biology", "English"],
  },
  {
    id: "amu-11-pcb-2026-image",
    exam: "AMU",
    class: "11",
    stream: "PCB",
    year: 2026,
    examDate: "March 16, 2026",
    date: "March 16, 2026",
    releaseTime: "7:30 PM",
    downloads: 178000,
    status: "available",
    source: "image_classes",
    pdfUrl: "/answer-keys/amu-class-11-pcb-2026-image.pdf",
    videoUrl: "https://youtube.com/watch?v=example4",
    accuracy: 98,
    totalQuestions: 150,
    challengedQuestions: 3,
    lastUpdated: "March 16, 2026",
    expertName: "Dr. Zainab Fatima (Biology)",
    isVerified: true,
    subjects: ["Physics", "Chemistry", "Biology", "English"],
  },

  // ==================== AMU CLASS 11 DIPLOMA - 2026 ====================
  {
    id: "amu-11-diploma-2026-official",
    exam: "AMU",
    class: "11",
    stream: "Diploma",
    year: 2026,
    examDate: "March 17, 2026",
    date: "Processing",
    downloads: 0,
    status: "processing",
    source: "official",
    totalQuestions: 100,
    subjects: ["Mathematics", "Physics", "Chemistry", "Drawing"],
  },
  {
    id: "amu-11-diploma-2026-image",
    exam: "AMU",
    class: "11",
    stream: "Diploma",
    year: 2026,
    examDate: "March 17, 2026",
    date: "March 17, 2026",
    releaseTime: "8:30 PM",
    downloads: 95000,
    status: "available",
    source: "image_classes",
    pdfUrl: "/answer-keys/amu-class-11-diploma-2026-image.pdf",
    videoUrl: "https://youtube.com/watch?v=example5",
    accuracy: 96,
    totalQuestions: 100,
    challengedQuestions: 4,
    lastUpdated: "March 17, 2026",
    expertName: "Engr. Mohd Salman",
    isVerified: true,
    subjects: ["Mathematics", "Physics", "Chemistry", "Drawing"],
  },

  // ==================== JMI CLASS 6 - 2026 ====================
  {
    id: "jmi-6-2026-official",
    exam: "JMI",
    class: "6",
    year: 2026,
    examDate: "March 20, 2026",
    date: "March 28, 2026",
    releaseTime: "5:00 PM",
    downloads: 38000,
    status: "available",
    source: "official",
    pdfUrl: "/answer-keys/jmi-class-6-2026-official.pdf",
    totalQuestions: 100,
    lastUpdated: "March 28, 2026",
    officialSource: "JMI Official Website",
    subjects: ["General Knowledge", "Mathematics", "Science", "English", "Urdu/Hindi"],
  },
  {
    id: "jmi-6-2026-image",
    exam: "JMI",
    class: "6",
    year: 2026,
    examDate: "March 20, 2026",
    date: "March 20, 2026",
    releaseTime: "6:00 PM",
    downloads: 112000,
    status: "available",
    source: "image_classes",
    pdfUrl: "/answer-keys/jmi-class-6-2026-image.pdf",
    videoUrl: "https://youtube.com/watch?v=example6",
    accuracy: 99,
    totalQuestions: 100,
    challengedQuestions: 1,
    lastUpdated: "March 20, 2026",
    expertName: "Dr. Naseem Akhtar",
    isVerified: true,
    subjects: ["General Knowledge", "Mathematics", "Science", "English", "Urdu/Hindi"],
  },

  // ==================== JMI CLASS 9 - 2026 ====================
  {
    id: "jmi-9-2026-official",
    exam: "JMI",
    class: "9",
    year: 2026,
    examDate: "March 22, 2026",
    date: "Processing",
    downloads: 0,
    status: "processing",
    source: "official",
    totalQuestions: 100,
    subjects: ["Mathematics", "Science", "Social Science", "English", "Urdu/Hindi"],
  },
  {
    id: "jmi-9-2026-image",
    exam: "JMI",
    class: "9",
    year: 2026,
    examDate: "March 22, 2026",
    date: "March 22, 2026",
    releaseTime: "7:00 PM",
    downloads: 145000,
    status: "available",
    source: "image_classes",
    pdfUrl: "/answer-keys/jmi-class-9-2026-image.pdf",
    videoUrl: "https://youtube.com/watch?v=example7",
    accuracy: 98,
    totalQuestions: 100,
    challengedQuestions: 2,
    lastUpdated: "March 22, 2026",
    expertName: "Prof. Irfan Malik",
    isVerified: true,
    subjects: ["Mathematics", "Science", "Social Science", "English", "Urdu/Hindi"],
  },

  // ==================== JMI CLASS 11 SCIENCE - 2026 ====================
  {
    id: "jmi-11-science-2026-official",
    exam: "JMI",
    class: "11",
    stream: "Science",
    year: 2026,
    examDate: "March 24, 2026",
    date: "Coming Soon",
    downloads: 0,
    status: "coming_soon",
    source: "official",
    totalQuestions: 150,
    subjects: ["Physics", "Chemistry", "Mathematics/Biology", "English"],
  },
  {
    id: "jmi-11-science-2026-image",
    exam: "JMI",
    class: "11",
    stream: "Science",
    year: 2026,
    examDate: "March 24, 2026",
    date: "March 24, 2026",
    releaseTime: "8:00 PM",
    downloads: 165000,
    status: "available",
    source: "image_classes",
    pdfUrl: "/answer-keys/jmi-class-11-science-2026-image.pdf",
    videoUrl: "https://youtube.com/watch?v=example8",
    accuracy: 97,
    totalQuestions: 150,
    challengedQuestions: 5,
    lastUpdated: "March 24, 2026",
    expertName: "Dr. Zeeshan Ahmad",
    isVerified: true,
    subjects: ["Physics", "Chemistry", "Mathematics/Biology", "English"],
  },

  // ==================== JMI CLASS 11 COMMERCE - 2026 ====================
  {
    id: "jmi-11-commerce-2026-official",
    exam: "JMI",
    class: "11",
    stream: "Commerce",
    year: 2026,
    examDate: "March 25, 2026",
    date: "Coming Soon",
    downloads: 0,
    status: "coming_soon",
    source: "official",
    totalQuestions: 100,
    subjects: ["Business Studies", "Accountancy", "Economics", "English"],
  },
  {
    id: "jmi-11-commerce-2026-image",
    exam: "JMI",
    class: "11",
    stream: "Commerce",
    year: 2026,
    examDate: "March 25, 2026",
    date: "March 25, 2026",
    releaseTime: "7:30 PM",
    downloads: 78000,
    status: "available",
    source: "image_classes",
    pdfUrl: "/answer-keys/jmi-class-11-commerce-2026-image.pdf",
    accuracy: 98,
    totalQuestions: 100,
    challengedQuestions: 2,
    lastUpdated: "March 25, 2026",
    expertName: "CA Mohd Arif",
    isVerified: true,
    subjects: ["Business Studies", "Accountancy", "Economics", "English"],
  },

  // ==================== PREVIOUS YEAR - 2023 ====================
  {
    id: "amu-6-2023-official",
    exam: "AMU",
    class: "6",
    year: 2023,
    examDate: "March 5, 2023",
    date: "March 15, 2023",
    downloads: 125000,
    status: "available",
    source: "official",
    pdfUrl: "/answer-keys/amu-class-6-2023-official.pdf",
    totalQuestions: 100,
    officialSource: "AMU Official Website",
    subjects: ["General Knowledge", "Mathematics", "Science", "English", "Urdu/Hindi"],
  },
  {
    id: "amu-6-2023-image",
    exam: "AMU",
    class: "6",
    year: 2023,
    examDate: "March 5, 2023",
    date: "March 5, 2023",
    downloads: 325000,
    status: "available",
    source: "image_classes",
    pdfUrl: "/answer-keys/amu-class-6-2023-image.pdf",
    videoUrl: "https://youtube.com/watch?v=example9",
    accuracy: 100,
    totalQuestions: 100,
    challengedQuestions: 0,
    expertName: "Dr. Ahmad Khan",
    isVerified: true,
    subjects: ["General Knowledge", "Mathematics", "Science", "English", "Urdu/Hindi"],
  },
  {
    id: "amu-9-2023-official",
    exam: "AMU",
    class: "9",
    year: 2023,
    examDate: "March 8, 2023",
    date: "March 18, 2023",
    downloads: 145000,
    status: "available",
    source: "official",
    pdfUrl: "/answer-keys/amu-class-9-2023-official.pdf",
    totalQuestions: 100,
    officialSource: "AMU Official Website",
    subjects: ["Mathematics", "Science", "Social Science", "English", "Urdu/Hindi"],
  },
  {
    id: "amu-9-2023-image",
    exam: "AMU",
    class: "9",
    year: 2023,
    examDate: "March 8, 2023",
    date: "March 8, 2023",
    downloads: 398000,
    status: "available",
    source: "image_classes",
    pdfUrl: "/answer-keys/amu-class-9-2023-image.pdf",
    videoUrl: "https://youtube.com/watch?v=example10",
    accuracy: 100,
    totalQuestions: 100,
    challengedQuestions: 0,
    expertName: "Prof. Syed Ali Haider",
    isVerified: true,
    subjects: ["Mathematics", "Science", "Social Science", "English", "Urdu/Hindi"],
  },
  {
    id: "amu-11-pcm-2023-official",
    exam: "AMU",
    class: "11",
    stream: "PCM",
    year: 2023,
    examDate: "March 12, 2023",
    date: "March 22, 2023",
    downloads: 178000,
    status: "available",
    source: "official",
    pdfUrl: "/answer-keys/amu-class-11-pcm-2023-official.pdf",
    totalQuestions: 150,
    officialSource: "AMU Official Website",
    subjects: ["Physics", "Chemistry", "Mathematics", "English"],
  },
  {
    id: "amu-11-pcm-2023-image",
    exam: "AMU",
    class: "11",
    stream: "PCM",
    year: 2023,
    examDate: "March 12, 2023",
    date: "March 12, 2023",
    downloads: 485000,
    status: "available",
    source: "image_classes",
    pdfUrl: "/answer-keys/amu-class-11-pcm-2023-image.pdf",
    videoUrl: "https://youtube.com/watch?v=example11",
    accuracy: 99,
    totalQuestions: 150,
    challengedQuestions: 2,
    expertName: "Dr. Rashid Ahmed",
    isVerified: true,
    subjects: ["Physics", "Chemistry", "Mathematics", "English"],
  },
];

// Detailed Dispute Information
const disputeDetails: Record<string, ComparisonResult[]> = {
  "amu-6-2026": [
    {
      questionNo: 23,
      subject: "Mathematics",
      officialAnswer: "C",
      imageClassesAnswer: "D",
      isDisputed: true,
      explanation: "The question asks for the LCM of 12 and 18. Official answer states 36 (C), but the actual calculation shows LCM = 36. However, there was a printing error in option C which showed 34 instead of 36 in Set A. Option D (36) is correct for Set A papers.",
      correctAnswer: "D (for Set A), C (for Set B)",
      disputeReason: "Printing error in question paper",
      videoExplanation: "https://youtube.com/watch?v=dispute1",
    },
    {
      questionNo: 45,
      subject: "Science",
      officialAnswer: "A",
      imageClassesAnswer: "C",
      isDisputed: true,
      explanation: "The question about photosynthesis process has ambiguous wording. Official answer considers only light reaction, while the complete answer should include both light and dark reactions. Option C covers the complete process.",
      correctAnswer: "C",
      disputeReason: "Ambiguous question wording",
      videoExplanation: "https://youtube.com/watch?v=dispute2",
    },
  ],
  "amu-9-2026": [
    {
      questionNo: 67,
      subject: "Science",
      officialAnswer: "B",
      imageClassesAnswer: "D",
      isDisputed: true,
      explanation: "The atomic structure question has outdated information in option B based on old NCERT. As per new NCERT 2026 edition, option D is more accurate.",
      correctAnswer: "D",
      disputeReason: "Based on updated NCERT 2026",
      videoExplanation: "https://youtube.com/watch?v=dispute3",
    },
  ],
  "amu-11-pcm-2026": [
    {
      questionNo: 12,
      subject: "Physics",
      officialAnswer: "A",
      imageClassesAnswer: "C",
      isDisputed: true,
      explanation: "The projectile motion question considers air resistance in official answer but the question clearly states 'in vacuum'. Without air resistance, option C is correct.",
      correctAnswer: "C",
      disputeReason: "Misinterpretation of question conditions",
      videoExplanation: "https://youtube.com/watch?v=dispute4",
    },
    {
      questionNo: 34,
      subject: "Chemistry",
      officialAnswer: "B",
      imageClassesAnswer: "A",
      isDisputed: true,
      explanation: "Organic chemistry reaction mechanism question. Official considers SN1 but the substrate clearly favors SN2 mechanism based on structure.",
      correctAnswer: "A",
      disputeReason: "Technical error in mechanism interpretation",
      videoExplanation: "https://youtube.com/watch?v=dispute5",
    },
    {
      questionNo: 78,
      subject: "Mathematics",
      officialAnswer: "D",
      imageClassesAnswer: "B",
      isDisputed: true,
      explanation: "Integration problem with limits. Official answer has calculation error in final step. Our solution verified by multiple experts.",
      correctAnswer: "B",
      disputeReason: "Calculation error",
      videoExplanation: "https://youtube.com/watch?v=dispute6",
    },
    {
      questionNo: 92,
      subject: "Physics",
      officialAnswer: "C",
      imageClassesAnswer: "A",
      isDisputed: true,
      explanation: "Electromagnetic induction problem. Sign convention not specified in question, leading to ambiguity.",
      correctAnswer: "Both A and C acceptable",
      disputeReason: "Sign convention ambiguity",
      videoExplanation: "https://youtube.com/watch?v=dispute7",
    },
    {
      questionNo: 128,
      subject: "Chemistry",
      officialAnswer: "A",
      imageClassesAnswer: "D",
      isDisputed: true,
      explanation: "Thermodynamics question with incorrect data given. Based on given data, D is correct. Based on actual standard values, A would be correct.",
      correctAnswer: "D (based on given data)",
      disputeReason: "Incorrect data in question",
      videoExplanation: "https://youtube.com/watch?v=dispute8",
    },
  ],
};

const AnswerKeysPage = () => {
  const [selectedExam, setSelectedExam] = useState<"all" | "AMU" | "JMI">("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<"all" | KeySource>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [showNotifySuccess, setShowNotifySuccess] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "comparison">("grid");
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [selectedComparison, setSelectedComparison] = useState<string | null>(null);
  const [showAnswerKeyModal, setShowAnswerKeyModal] = useState(false);
  const [selectedAnswerKey, setSelectedAnswerKey] = useState<AnswerKey | null>(null);
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [showOnlyDisputed, setShowOnlyDisputed] = useState(false);

  // Filter answer keys
  const filteredKeys = answerKeys.filter((key) => {
    if (selectedExam !== "all" && key.exam !== selectedExam) return false;
    if (selectedClass !== "all" && key.class !== selectedClass) return false;
    if (selectedYear !== "all" && key.year.toString() !== selectedYear) return false;
    if (selectedSource !== "all" && key.source !== selectedSource) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchStr = `${key.exam} ${key.class} ${key.stream || ""} ${key.year}`.toLowerCase();
      if (!searchStr.includes(query)) return false;
    }
    return true;
  });

  // Group keys by exam-class-stream-year for comparison
  const groupedKeys = filteredKeys.reduce((acc, key) => {
    const groupKey = `${key.exam}-${key.class}-${key.stream || "general"}-${key.year}`;
    if (!acc[groupKey]) {
      acc[groupKey] = { official: null, image_classes: null, groupInfo: { exam: key.exam, class: key.class, stream: key.stream, year: key.year } };
    }
    acc[groupKey][key.source] = key;
    return acc;
  }, {} as Record<string, { official: AnswerKey | null; image_classes: AnswerKey | null; groupInfo: { exam: string; class: string; stream?: string; year: number } }>);

  const imageClassesKeys = filteredKeys.filter((k) => k.source === "image_classes" && k.status === "available");
  const officialKeys = filteredKeys.filter((k) => k.source === "official" && k.status === "available");

  const totalDownloads = answerKeys.reduce((sum, k) => sum + k.downloads, 0);
  const averageAccuracy = imageClassesKeys.length > 0
    ? Math.round(imageClassesKeys.reduce((sum, k) => sum + (k.accuracy || 0), 0) / imageClassesKeys.length)
    : 0;

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail) {
      setShowNotifySuccess(true);
      setNotifyEmail("");
      setTimeout(() => setShowNotifySuccess(false), 3000);
    }
  };

  const openComparison = (groupKey: string) => {
    setSelectedComparison(groupKey);
    setShowComparisonModal(true);
  };

  const openAnswerKey = (key: AnswerKey) => {
    setSelectedAnswerKey(key);
    setShowAnswerKeyModal(true);
  };

  const getStatusBadge = (status: KeyStatus) => {
    switch (status) {
      case "available":
        return (
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            Available
          </span>
        );
      case "processing":
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium animate-pulse flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
            Processing
          </span>
        );
      case "coming_soon":
        return (
          <span className="px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Coming Soon
          </span>
        );
    }
  };

  // Generate comparison data
  const generateComparison = (groupKey: string): ComparisonResult[] => {
    const key = groupKey.replace(/-general/g, "").toLowerCase().replace(/-/g, "-");
    const disputes = disputeDetails[key] || [];
    
    // Get the actual answer keys for this group
    const group = groupedKeys[groupKey];
    if (!group?.official?.answers || !group?.image_classes?.answers) {
      // Return sample data if no actual answers
      const sampleResults: ComparisonResult[] = [];
      const totalQ = group?.official?.totalQuestions || group?.image_classes?.totalQuestions || 100;
      
      for (let i = 1; i <= Math.min(totalQ, 20); i++) {
        const dispute = disputes.find(d => d.questionNo === i);
        if (dispute) {
          sampleResults.push(dispute);
        } else {
          const answer = ["A", "B", "C", "D"][Math.floor(Math.random() * 4)];
          sampleResults.push({
            questionNo: i,
            officialAnswer: answer,
            imageClassesAnswer: answer,
            isDisputed: false,
          });
        }
      }
      
      // Add all disputes
      disputes.forEach(d => {
        if (!sampleResults.find(r => r.questionNo === d.questionNo)) {
          sampleResults.push(d);
        }
      });
      
      return sampleResults.sort((a, b) => a.questionNo - b.questionNo);
    }

    // Generate from actual data
    const results: ComparisonResult[] = [];
    const officialAnswers = group.official.answers;
    const imageAnswers = group.image_classes.answers;

    for (let i = 0; i < officialAnswers.length; i++) {
      const official = officialAnswers[i];
      const image = imageAnswers.find(a => a.questionNo === official.questionNo);
      const dispute = disputes.find(d => d.questionNo === official.questionNo);

      if (dispute) {
        results.push(dispute);
      } else {
        results.push({
          questionNo: official.questionNo,
          subject: official.subject,
          officialAnswer: official.answer,
          imageClassesAnswer: image?.answer || official.answer,
          isDisputed: image?.answer !== official.answer,
        });
      }
    }

    return results;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Answer Key Detail Modal */}
      {showAnswerKeyModal && selectedAnswerKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAnswerKeyModal(false)} />
          <div className="relative bg-[#111] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-[#111] border-b border-white/10 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                      selectedAnswerKey.exam === "AMU" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {selectedAnswerKey.exam}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                      selectedAnswerKey.source === "official" ? "bg-amber-500/20 text-amber-400" : "bg-purple-500/20 text-purple-400"
                    }`}>
                      {selectedAnswerKey.source === "official" ? "🏛️ Official" : "🎓 Image Classes"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold">
                    Class {selectedAnswerKey.class} {selectedAnswerKey.stream && `- ${selectedAnswerKey.stream}`} ({selectedAnswerKey.year})
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {selectedAnswerKey.totalQuestions} Questions • Released: {selectedAnswerKey.date}
                  </p>
                </div>
                <button
                  onClick={() => setShowAnswerKeyModal(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Info Bar */}
              {selectedAnswerKey.source === "image_classes" && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-green-500/10 text-center">
                    <p className="text-2xl font-bold text-green-400">{selectedAnswerKey.accuracy}%</p>
                    <p className="text-xs text-gray-400">Accuracy</p>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-500/10 text-center">
                    <p className="text-2xl font-bold text-yellow-400">{selectedAnswerKey.challengedQuestions}</p>
                    <p className="text-xs text-gray-400">Disputed</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/10 text-center">
                    <p className="text-2xl font-bold text-blue-400">{(selectedAnswerKey.downloads / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-400">Downloads</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/10 text-center">
                    <p className="text-sm font-bold text-purple-400">{selectedAnswerKey.releaseTime}</p>
                    <p className="text-xs text-gray-400">Released</p>
                  </div>
                </div>
              )}

              {/* Subject Filter */}
              {selectedAnswerKey.subjects && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterSubject("all")}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      filterSubject === "all" ? "bg-purple-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    All Subjects
                  </button>
                  {selectedAnswerKey.subjects.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setFilterSubject(sub)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        filterSubject === sub ? "bg-purple-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Answers Grid */}
            <div className="p-6 overflow-auto max-h-[60vh]">
              {selectedAnswerKey.answers ? (
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {selectedAnswerKey.answers
                    .filter((a) => filterSubject === "all" || a.subject === filterSubject)
                    .map((answer) => (
                      <div
                        key={answer.questionNo}
                        className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center hover:border-purple-500/50 transition-all cursor-pointer group"
                      >
                        <span className="text-xs text-gray-500">Q{answer.questionNo}</span>
                        <span className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                          {answer.answer}
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">Detailed answers not available for preview</p>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-medium">
                    Download Full PDF
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#111] border-t border-white/10 p-4">
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
                {selectedAnswerKey.videoUrl && (
                  <button className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-medium flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch Video Solution
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparisonModal && selectedComparison && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowComparisonModal(false)} />
          <div className="relative bg-[#111] border border-white/10 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-[#111] border-b border-white/10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-sm font-bold">
                      🏛️ Official vs 🎓 Image Classes
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {groupedKeys[selectedComparison]?.groupInfo.exam} Class {groupedKeys[selectedComparison]?.groupInfo.class}
                    {groupedKeys[selectedComparison]?.groupInfo.stream && ` - ${groupedKeys[selectedComparison]?.groupInfo.stream}`}
                    {" "}({groupedKeys[selectedComparison]?.groupInfo.year})
                  </h3>
                </div>
                <button
                  onClick={() => setShowComparisonModal(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Stats */}
              {(() => {
                const comparison = generateComparison(selectedComparison);
                const matching = comparison.filter((c) => !c.isDisputed).length;
                const disputed = comparison.filter((c) => c.isDisputed).length;
                const matchRate = Math.round((matching / comparison.length) * 100);

                return (
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-3 rounded-xl bg-white/5 text-center">
                      <p className="text-2xl font-bold">{comparison.length}</p>
                      <p className="text-xs text-gray-400">Total Questions</p>
                    </div>
                    <div className="p-3 rounded-xl bg-green-500/10 text-center">
                      <p className="text-2xl font-bold text-green-400">{matching}</p>
                      <p className="text-xs text-gray-400">Matching</p>
                    </div>
                    <div className="p-3 rounded-xl bg-yellow-500/10 text-center">
                      <p className="text-2xl font-bold text-yellow-400">{disputed}</p>
                      <p className="text-xs text-gray-400">Disputed</p>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/10 text-center">
                      <p className="text-2xl font-bold text-blue-400">{matchRate}%</p>
                      <p className="text-xs text-gray-400">Match Rate</p>
                    </div>
                  </div>
                );
              })()}

              {/* Filter */}
              <div className="flex items-center gap-4 mt-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyDisputed}
                    onChange={(e) => setShowOnlyDisputed(e.target.checked)}
                    className="w-4 h-4 rounded accent-yellow-500"
                  />
                  <span className="text-gray-400">Show only disputed answers</span>
                </label>
              </div>
            </div>

            {/* Comparison Content */}
            <div className="p-6 overflow-auto max-h-[55vh]">
              {/* Legend */}
              <div className="flex items-center gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-gray-400">Matching Answers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="text-gray-400">Disputed Answers</span>
                </div>
              </div>

              <div className="space-y-3">
                {generateComparison(selectedComparison)
                  .filter((item) => !showOnlyDisputed || item.isDisputed)
                  .map((item) => (
                    <div
                      key={item.questionNo}
                      className={`p-4 rounded-xl border transition-all ${
                        item.isDisputed
                          ? "bg-yellow-500/10 border-yellow-500/30"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Question Number */}
                        <div className="w-14 h-14 rounded-xl bg-white/10 flex flex-col items-center justify-center">
                          <span className="text-xs text-gray-500">Q</span>
                          <span className="text-lg font-bold">{item.questionNo}</span>
                        </div>

                        {/* Subject */}
                        {item.subject && (
                          <div className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-400">
                            {item.subject}
                          </div>
                        )}

                        {/* Answers */}
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div className={`p-3 rounded-xl border text-center ${
                            item.isDisputed ? "bg-amber-500/10 border-amber-500/30" : "bg-amber-500/5 border-amber-500/20"
                          }`}>
                            <p className="text-xs text-amber-400 mb-1">🏛️ Official</p>
                            <p className={`text-2xl font-black ${item.isDisputed ? "text-amber-400" : "text-white"}`}>
                              {item.officialAnswer}
                            </p>
                          </div>
                          <div className={`p-3 rounded-xl border text-center ${
                            item.isDisputed ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-500/5 border-purple-500/20"
                          }`}>
                            <p className="text-xs text-purple-400 mb-1">🎓 Image Classes</p>
                            <p className={`text-2xl font-black ${item.isDisputed ? "text-purple-400" : "text-white"}`}>
                              {item.imageClassesAnswer}
                            </p>
                          </div>
                        </div>

                        {/* Status Icon */}
                        {item.isDisputed ? (
                          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                            <span className="text-2xl">⚠️</span>
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <span className="text-green-400 text-xl">✓</span>
                          </div>
                        )}
                      </div>

                      {/* Dispute Explanation */}
                      {item.isDisputed && item.explanation && (
                        <div className="mt-4 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">💡</span>
                            <div className="flex-1">
                              <p className="font-medium text-yellow-400 mb-2">Dispute Reason: {item.disputeReason}</p>
                              <p className="text-sm text-gray-300 mb-3">{item.explanation}</p>
                              <div className="flex items-center justify-between">
                                <p className="text-sm">
                                  <span className="text-gray-400">Recommended Answer: </span>
                                  <span className="text-green-400 font-bold">{item.correctAnswer}</span>
                                </p>
                                {item.videoExplanation && (
                                  <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Watch Explanation
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#111] border-t border-white/10 p-4">
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Official Key
                </button>
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Image Classes Key
                </button>
                <button className="py-3 px-6 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 font-medium flex items-center justify-center gap-2">
                  📊 Export Comparison
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 HERO SECTION */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 rounded-full px-5 py-2 mb-6">
            <span className="flex items-center gap-2 text-amber-400 text-sm font-medium">
              🏛️ Official
            </span>
            <span className="text-gray-500">vs</span>
            <span className="flex items-center gap-2 text-purple-400 text-sm font-medium">
              🎓 Image Classes
            </span>
            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-bold">
              2026 LIVE
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Official
            </span>
            <span className="text-gray-400 mx-4">&</span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Image Classes
            </span>
            <br />
            <span className="text-white">Answer Keys</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Compare official university answer keys with expert-verified Image Classes keys.
            Get detailed explanations for all disputed answers with video solutions.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-5xl mx-auto mb-10">
            {[
              { value: officialKeys.length, label: "Official Keys", icon: "🏛️", color: "amber" },
              { value: imageClassesKeys.length, label: "Image Classes", icon: "🎓", color: "purple" },
              { value: `${averageAccuracy}%`, label: "Avg Accuracy", icon: "🎯", color: "green" },
              { value: `${(totalDownloads / 1000000).toFixed(1)}M`, label: "Downloads", icon: "📥", color: "blue" },
              { value: answerKeys.filter(k => k.videoUrl).length, label: "Video Solutions", icon: "🎥", color: "red" },
              { value: Object.keys(disputeDetails).reduce((sum, k) => sum + disputeDetails[k].length, 0), label: "Disputed Qs", icon: "⚠️", color: "yellow" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl bg-${stat.color}-500/5 border border-${stat.color}-500/20 hover:border-${stat.color}-500/50 transition-all duration-300 group`}
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <p className={`text-xl font-black text-${stat.color}-400`}>{stat.value}</p>
                <p className="text-gray-500 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Source Toggle */}
          <div className="inline-flex rounded-2xl bg-white/5 border border-white/10 p-1.5">
            {[
              { value: "all", label: "All Keys", icon: "📚" },
              { value: "official", label: "Official Only", icon: "🏛️" },
              { value: "image_classes", label: "Image Classes Only", icon: "🎓" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedSource(option.value as typeof selectedSource)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  selectedSource === option.value
                    ? "bg-gradient-to-r from-amber-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{option.icon}</span>
                <span className="hidden sm:inline">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 KEY COMPARISON BANNER */}
      <section className="py-8 px-6 border-y border-white/5 bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Official Side */}
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">🏛️</div>
                <div>
                  <h3 className="font-bold text-amber-400">Official Answer Keys</h3>
                  <p className="text-xs text-gray-400">From AMU & JMI Universities</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-amber-400">•</span> University verified
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-amber-400">•</span> 5-10 days after exam
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-amber-400">•</span> PDF format only
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-amber-400">•</span> No explanations
                </div>
              </div>
            </div>

            {/* Image Classes Side */}
            <div className="p-5 rounded-2xl bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                RECOMMENDED
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">🎓</div>
                <div>
                  <h3 className="font-bold text-purple-400">Image Classes Answer Keys</h3>
                  <p className="text-xs text-gray-400">Expert Verified • Same Day Release</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Same day release
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> 98%+ accuracy
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Video solutions
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Dispute analysis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 FILTERS */}
      <section className="py-6 px-6 border-b border-white/5 bg-[#111]/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search answer keys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* View Mode */}
              <div className="flex rounded-xl overflow-hidden border border-white/10">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === "grid" ? "bg-purple-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  📱 Grid
                </button>
                <button
                  onClick={() => setViewMode("comparison")}
                  className={`px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === "comparison" ? "bg-purple-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  ⚖️ Compare
                </button>
              </div>

              {/* Exam Filter */}
              <div className="flex rounded-xl overflow-hidden border border-white/10">
                {(["all", "AMU", "JMI"] as const).map((exam) => (
                  <button
                    key={exam}
                    onClick={() => setSelectedExam(exam)}
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      selectedExam === exam ? "bg-blue-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {exam === "all" ? "All" : exam}
                  </button>
                ))}
              </div>

              {/* Class Filter */}
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none cursor-pointer"
              >
                <option value="all">All Classes</option>
                <option value="6">Class 6</option>
                <option value="9">Class 9</option>
                <option value="11">Class 11</option>
              </select>

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm focus:border-purple-500 focus:outline-none cursor-pointer"
              >
                <option value="all">All Years</option>
                <option value="2026">2026</option>
                <option value="2023">2023</option>
              </select>

              {/* Clear */}
              {(selectedExam !== "all" || selectedClass !== "all" || selectedYear !== "all" || selectedSource !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedExam("all");
                    setSelectedClass("all");
                    setSelectedYear("all");
                    setSelectedSource("all");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 text-sm text-red-400 hover:text-red-300"
                >
                  ✕ Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 CONTENT */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {viewMode === "comparison" ? (
            /* COMPARISON VIEW */
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
                  ⚖️
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Compare Answer Keys</h2>
                  <p className="text-gray-500 text-sm">Official vs Image Classes - Side by Side</p>
                </div>
              </div>

              {Object.entries(groupedKeys).map(([groupKey, group]) => (
                <div
                  key={groupKey}
                  className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5 border border-white/10 hover:border-white/20 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                        group.groupInfo.exam === "AMU" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                      }`}>
                        {group.groupInfo.exam}
                      </span>
                      <h3 className="text-xl font-bold">
                        Class {group.groupInfo.class}
                        {group.groupInfo.stream && <span className="text-gray-400"> - {group.groupInfo.stream}</span>}
                      </h3>
                      <span className="text-gray-500">{group.groupInfo.year}</span>
                    </div>

                    {group.official?.status === "available" && group.image_classes?.status === "available" && (
                      <button
                        onClick={() => openComparison(groupKey)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-white/20 hover:border-white/40 transition-all flex items-center gap-2 text-sm font-medium"
                      >
                        🔍 View Full Comparison
                      </button>
                    )}
                  </div>

                  {/* Cards */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Official */}
                    <div className={`p-5 rounded-xl border ${
                      group.official?.status === "available"
                        ? "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40"
                        : "bg-white/5 border-white/10 opacity-60"
                    } transition-all cursor-pointer`}
                      onClick={() => group.official?.status === "available" && openAnswerKey(group.official)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🏛️</span>
                          <span className="font-bold text-amber-400">Official</span>
                        </div>
                        {group.official && getStatusBadge(group.official.status)}
                      </div>

                      {group.official?.status === "available" ? (
                        <>
                          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                            <div className="p-2 rounded-lg bg-white/5">
                              <p className="text-gray-500 text-xs">Released</p>
                              <p className="font-medium">{group.official.date}</p>
                            </div>
                            <div className="p-2 rounded-lg bg-white/5">
                              <p className="text-gray-500 text-xs">Downloads</p>
                              <p className="font-medium">{(group.official.downloads / 1000).toFixed(0)}K</p>
                            </div>
                          </div>
                          <button className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 font-medium text-sm transition-all flex items-center justify-center gap-2">
                            📥 Download Official PDF
                          </button>
                        </>
                      ) : (
                        <div className="text-center py-6 text-gray-500 text-sm">
                          {group.official?.status === "processing" ? "Being processed by university..." : "Awaiting university release"}
                        </div>
                      )}
                    </div>

                    {/* Image Classes */}
                    <div className={`p-5 rounded-xl border relative ${
                      group.image_classes?.status === "available"
                        ? "bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40"
                        : "bg-white/5 border-white/10 opacity-60"
                    } transition-all cursor-pointer`}
                      onClick={() => group.image_classes?.status === "available" && openAnswerKey(group.image_classes)}
                    >
                      {group.image_classes?.status === "available" && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                          ⭐ RECOMMENDED
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🎓</span>
                          <span className="font-bold text-purple-400">Image Classes</span>
                          {group.image_classes?.isVerified && (
                            <span className="text-blue-400 text-sm">✓</span>
                          )}
                        </div>
                        {group.image_classes && getStatusBadge(group.image_classes.status)}
                      </div>

                      {group.image_classes?.status === "available" ? (
                        <>
                          <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                            <div className="p-2 rounded-lg bg-green-500/10 text-center">
                              <p className="font-bold text-green-400">{group.image_classes.accuracy}%</p>
                              <p className="text-[10px] text-gray-400">Accuracy</p>
                            </div>
                            <div className="p-2 rounded-lg bg-yellow-500/10 text-center">
                              <p className="font-bold text-yellow-400">{group.image_classes.challengedQuestions}</p>
                              <p className="text-[10px] text-gray-400">Disputed</p>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-500/10 text-center">
                              <p className="font-bold text-blue-400">{(group.image_classes.downloads / 1000).toFixed(0)}K</p>
                              <p className="text-[10px] text-gray-400">Downloads</p>
                            </div>
                          </div>

                          {group.image_classes.expertName && (
                            <p className="text-xs text-gray-400 mb-3">
                              👨‍🏫 Verified by {group.image_classes.expertName}
                            </p>
                          )}

                          <div className="flex gap-2">
                            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-medium text-sm transition-all flex items-center justify-center gap-2">
                              📥 Download
                            </button>
                            {group.image_classes.videoUrl && (
                              <button className="py-3 px-4 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all">
                                🎥
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-6 text-gray-500 text-sm">
                          Coming soon...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* GRID VIEW */
            <>
              {/* Image Classes Keys */}
              {imageClassesKeys.length > 0 && selectedSource !== "official" && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center text-2xl">
                        🎓
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Image Classes Answer Keys</h2>
                        <p className="text-gray-500 text-sm">Expert verified • Video solutions • Same day release</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium">
                      ⭐ {averageAccuracy}% Avg Accuracy
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {imageClassesKeys.map((key) => (
                      <div
                        key={key.id}
                        onClick={() => openAnswerKey(key)}
                        className="group relative p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                      >
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          ⭐ RECOMMENDED
                        </div>

                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                                key.exam === "AMU" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                              }`}>
                                {key.exam}
                              </span>
                              <span className="text-gray-500 text-sm">{key.year}</span>
                            </div>
                            <h3 className="text-xl font-bold">
                              Class {key.class}
                              {key.stream && <span className="text-gray-400 font-normal"> - {key.stream}</span>}
                            </h3>
                          </div>
                        </div>

                        {/* Accuracy */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                              style={{ width: `${key.accuracy}%` }}
                            />
                          </div>
                          <span className="text-green-400 font-bold">{key.accuracy}%</span>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                          <div className="p-2 rounded-lg bg-white/5">
                            <p className="text-lg font-bold">{key.totalQuestions}</p>
                            <p className="text-xs text-gray-500">Questions</p>
                          </div>
                          <div className="p-2 rounded-lg bg-white/5">
                            <p className="text-lg font-bold text-yellow-400">{key.challengedQuestions}</p>
                            <p className="text-xs text-gray-500">Disputed</p>
                          </div>
                          <div className="p-2 rounded-lg bg-white/5">
                            <p className="text-lg font-bold">{(key.downloads / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-gray-500">Downloads</p>
                          </div>
                        </div>

                        {/* Expert */}
                        {key.expertName && (
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 mb-4">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-sm">
                              👨‍🏫
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{key.expertName}</p>
                              <p className="text-xs text-gray-500">Verified Expert</p>
                            </div>
                            {key.isVerified && <span className="text-blue-400">✓</span>}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-medium text-sm hover:from-purple-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2">
                            📥 Download PDF
                          </button>
                          {key.videoUrl && (
                            <button className="py-3 px-4 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all">
                              🎥
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Official Keys */}
              {officialKeys.length > 0 && selectedSource !== "image_classes" && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">
                      🏛️
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Official Answer Keys</h2>
                      <p className="text-gray-500 text-sm">Released by AMU & JMI Universities</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {officialKeys.map((key) => (
                      <div
                        key={key.id}
                        onClick={() => openAnswerKey(key)}
                        className="group p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                                key.exam === "AMU" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                              }`}>
                                {key.exam}
                              </span>
                              <span className="text-gray-500 text-sm">{key.year}</span>
                            </div>
                            <h3 className="text-xl font-bold">
                              Class {key.class}
                              {key.stream && <span className="text-gray-400 font-normal"> - {key.stream}</span>}
                            </h3>
                          </div>
                          <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30">
                            <span className="text-amber-400 text-xs font-bold">🏛️ Official</span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>📅</span> Exam: {key.examDate}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>📢</span> Released: {key.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>📥</span> {key.downloads.toLocaleString()} downloads
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>📝</span> {key.totalQuestions} questions
                          </div>
                        </div>

                        {/* Action */}
                        <button className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 font-medium text-sm transition-all flex items-center justify-center gap-2">
                          📥 Download Official PDF
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coming Soon */}
              {filteredKeys.filter((k) => k.status !== "available").length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                      ⏳
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Coming Soon</h2>
                      <p className="text-gray-500 text-sm">Keys being processed or awaiting release</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredKeys.filter((k) => k.status !== "available").map((key) => (
                      <div key={key.id} className="p-4 rounded-xl bg-white/5 border border-white/10 opacity-60">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            key.exam === "AMU" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                          }`}>
                            {key.exam}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            key.source === "official" ? "bg-amber-500/20 text-amber-400" : "bg-purple-500/20 text-purple-400"
                          }`}>
                            {key.source === "official" ? "Official" : "Image"}
                          </span>
                        </div>
                        <h3 className="font-medium mb-2">
                          Class {key.class} {key.stream && `- ${key.stream}`}
                        </h3>
                        {getStatusBadge(key.status)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {filteredKeys.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center text-4xl">
                    🔍
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Answer Keys Found</h3>
                  <p className="text-gray-400 mb-6">Try adjusting your filters</p>
                  <button
                    onClick={() => {
                      setSelectedExam("all");
                      setSelectedClass("all");
                      setSelectedYear("all");
                      setSelectedSource("all");
                      setSearchQuery("");
                    }}
                    className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 🔥 NOTIFY SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-purple-600/20 to-blue-600/20" />
            <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-500 to-blue-500 flex items-center justify-center text-3xl">
                🔔
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Instant Notifications</h2>
              <p className="text-gray-400 mb-8">
                Be the first to know when new answer keys are released - both Official and Image Classes!
              </p>

              {showNotifySuccess ? (
                <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400">
                  ✅ You'll be notified when new answer keys are available!
                </div>
              ) : (
                <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    required
                    className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-amber-600 via-purple-600 to-blue-600 rounded-xl font-bold hover:scale-105 transition-transform whitespace-nowrap"
                  >
                    Notify Me 🔔
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Check Your Rank?</h2>
        <p className="text-gray-400 mb-8">After checking the answer key, predict your rank instantly</p>
        <a
          href="/rank-predictor"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold hover:scale-105 transition-transform"
        >
          🎯 Predict My Rank
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </section>
    </div>
  );
};

export default AnswerKeysPage;