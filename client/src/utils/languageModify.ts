export const languageModify = (text: string, language?: string): string => {
  if (language === "en") return text;
  else if (language === "vi") {
    let result: string;
    switch (text) {
      case "Getting started":
        result = "Tạo tài khoản";
        break;
      case "Most Popular Courses":
        result = "Khóa học phổ biến";
        break;
      case "Welcome back":
        result = "Xin chào";
        break;
      case "Our new courses":
        result = "Những khóa học mới";
        break;
      case "Top rated courses":
        result = "Khóa học rating cao";
        break;
      case "See all":
        result = "Xem thêm";
        break;
      case "About this course":
        result = "Sơ lược về khóa học";
        break;
      case "see more":
        result = "Xem thêm";
        break;
      case "Skills you will gains":
        result = "Kỹ thuật đạt sẽ đạt được";
        break;
      case "Instructors":
        result = "Giảng viên";
        break;
      case "Requirement":
        result = "Năng lực yêu cầu";
        break;
      case "Top review":
        result = "Top đánh giá";
        break;
      case "Week":
        result = "Tuàn";
        break;
      case "Overview":
        result = "Tổng quan";
        break;

      case "Grade":
        result = "Điểm";
        break;

      case "Forum":
        result = "Forum";
        break;

      case "Assignments":
        result = "Bài tập";
        break;

      default:
        result = text;
        break;
    }
    return result;
  }
};
