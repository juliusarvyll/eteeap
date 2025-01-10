<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->string('applicant_id');
            $table->foreign('applicant_id')->references('applicant_id')->on('personal_infos')->onDelete('cascade');
            
            // Elementary
            $table->string('elementary_school');
            $table->string('elementary_address');
            $table->date('elementary_date_from');
            $table->date('elementary_date_to');
            $table->boolean('has_elementary_diploma');
            $table->string('elementary_diploma_file')->nullable();
            
            // High School
            $table->boolean('has_high_school_diploma');
            $table->string('high_school_diploma_file')->nullable();
            
            // PEPT
            $table->boolean('has_pept');
            $table->integer('pept_year')->nullable();
            $table->string('pept_grade')->nullable();
            
            // Post Secondary
            $table->boolean('has_post_secondary_diploma');
            $table->string('post_secondary_diploma_file')->nullable();
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('education');
    }
}; 