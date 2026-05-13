package com.sbmschool.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AppController {

    @GetMapping("/public/status")
    public Map<String, String> getStatus() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "System Online");
        response.put("campus", "SBM School Main Campus");
        return response;
    }

    @GetMapping("/student/profile")
    public Map<String, Object> getStudentProfile() {
        Map<String, Object> profile = new HashMap<>();
        profile.put("name", "Student User");
        profile.put("school", "SBM School");
        profile.put("role", "STUDENT");
        return profile;
    }

    @GetMapping("/admin/dashboard")
    public Map<String, String> getAdminData() {
        Map<String, String> data = new HashMap<>();
        data.put("totalStudents", "1250");
        data.put("activeStaff", "85");
        data.put("systemAlerts", "0");
        return data;
    }
}
